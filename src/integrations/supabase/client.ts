import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wfikzkeloesvznbxyelk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmaWt6a2Vsb2VzdnpuYnh5ZWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODEwMjUsImV4cCI6MjA2ODM1NzAyNX0.mUhxG2mMM-RNovo2EMYiGujyd_HLHIB88_kvLkm_Dn0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)