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

-- Drop the existing policy that allows users to update their own profiles (including role)
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Create a new policy that allows users to update their profile but NOT the role field
CREATE POLICY "Users can update own profile except role" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND OLD.role = NEW.role);

-- Create a separate policy for admins to update roles
CREATE POLICY "Admins can update user roles" 
ON public.user_profiles 
FOR UPDATE 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));