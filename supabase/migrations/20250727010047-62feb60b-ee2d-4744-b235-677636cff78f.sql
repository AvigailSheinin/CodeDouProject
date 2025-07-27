-- Fix infinite recursion in user_profiles RLS policies
-- First, drop the problematic admin policy
DROP POLICY "Admins can read all profiles" ON public.user_profiles;

-- Create a security definer function to check admin role without RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create new admin policy using the security definer function
CREATE POLICY "Admins can read all profiles using function"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Also add a policy for admins to update other users' roles
CREATE POLICY "Admins can update all profiles"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));