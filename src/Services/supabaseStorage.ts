import 'dotenv/config'; 
import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = process.env.PROJECT_URL as string
const PROJECT_API_KEY = process.env.PROJECT_API_KEY as string

export const supabase = createClient(PROJECT_URL, PROJECT_API_KEY)