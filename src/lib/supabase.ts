import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hiagpubggwosobztjivs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpYWdwdWJnZ3dvc29ienRqaXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMTUwMTgsImV4cCI6MjA0Nzc5MTAxOH0.7NvizlzZXhy6-W-L7M1OF9ZfWVWGfVQxQbnMSSYPFcQ'

export const supabase = createClient(supabaseUrl, supabaseKey) 