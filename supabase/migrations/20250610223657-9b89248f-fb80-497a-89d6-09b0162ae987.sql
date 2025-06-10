
-- Enable RLS on edit_requests table if not already enabled
ALTER TABLE public.edit_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert edit requests (public submissions)
CREATE POLICY "Allow public edit request submissions" 
  ON public.edit_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading edit requests (for admin dashboard later)
CREATE POLICY "Allow reading edit requests" 
  ON public.edit_requests 
  FOR SELECT 
  USING (true);

-- Create policy to allow updating edit requests (for admin status updates)
CREATE POLICY "Allow updating edit requests" 
  ON public.edit_requests 
  FOR UPDATE 
  USING (true);
