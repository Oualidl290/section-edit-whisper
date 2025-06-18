
-- Drop all policies that might reference the columns we're changing
DROP POLICY IF EXISTS "Anyone can insert comments with valid project_id" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can select projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;

-- Drop the foreign key constraint from comments table
ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_project_id_fkey;

-- Drop the primary key constraint from projects table
ALTER TABLE public.projects DROP CONSTRAINT projects_pkey;

-- Update projects table to use TEXT for id instead of UUID
ALTER TABLE public.projects ALTER COLUMN id TYPE TEXT;

-- Update comments table project_id to match
ALTER TABLE public.comments ALTER COLUMN project_id TYPE TEXT;

-- Re-add the primary key constraint on projects
ALTER TABLE public.projects ADD PRIMARY KEY (id);

-- Re-add the foreign key constraint with CASCADE delete
ALTER TABLE public.comments ADD CONSTRAINT comments_project_id_fkey 
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

-- Recreate all the policies
CREATE POLICY "Anyone can insert comments with valid project_id" 
  ON public.comments 
  FOR INSERT 
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id)
  );

CREATE POLICY "Authenticated users can insert projects" 
  ON public.projects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can select projects" 
  ON public.projects 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update projects" 
  ON public.projects 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects" 
  ON public.projects 
  FOR DELETE 
  TO authenticated
  USING (true);
