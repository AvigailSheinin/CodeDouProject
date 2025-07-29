-- Fix search path injection vulnerabilities in database functions
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_profiles 
    WHERE id = user_id AND role = 'admin'
  );
$function$;

-- Fix search path injection in update trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Drop the existing policy that allows users to update their own profiles
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Create a new policy that allows users to update their email only (not role)
CREATE POLICY "Users can update own email only" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a separate policy for admins to update all user data including roles
CREATE POLICY "Admins can update all user data" 
ON public.user_profiles 
FOR UPDATE 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Add a trigger to prevent non-admin users from updating their role
CREATE OR REPLACE FUNCTION public.prevent_role_self_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $function$
BEGIN
  -- If user is trying to update their own role and they're not an admin, prevent it
  IF (OLD.role != NEW.role AND auth.uid() = NEW.id AND NOT is_admin(auth.uid())) THEN
    RAISE EXCEPTION 'Users cannot update their own role';
  END IF;
  RETURN NEW;
END;
$function$;

-- Create trigger to enforce role update restriction
DROP TRIGGER IF EXISTS prevent_role_self_update_trigger ON public.user_profiles;
CREATE TRIGGER prevent_role_self_update_trigger
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_self_update();