
-- Automatically create a profile after signup

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Connect the function to Supabase Auth

DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Enable profile security

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile

DROP POLICY IF EXISTS "Users can view own profile"
ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = id);

-- Allow users to update their own profile

DROP POLICY IF EXISTS "Users can update own profile"
ON public.profiles;

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);

-- Create missing profiles for existing users

INSERT INTO public.profiles (id, full_name)
SELECT
  id,
  raw_user_meta_data ->> 'full_name'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
