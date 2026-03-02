import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://vtccaljxzqmzqtswnuim.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Y2NhbGp4enFtenF0c3dudWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDQ4MDMsImV4cCI6MjA4NzkyMDgwM30.VV3ljdRDyHQzxymh2s3x3o5TQVqrJ34MZ9Tg4ZOYo_w";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function test() {
    console.log("Testing signInWithPassword with non-existent email...");
    const res1 = await supabase.auth.signInWithPassword({ email: 'nonexistent123@example.com', password: 'password123' });
    console.log("Error 1:", res1.error?.message);

    console.log("Testing signUp with real email...");
    // Assuming 'test@example.com' doesn't exist yet, we sign it up
    await supabase.auth.signUp({ email: 'test_real_456@example.com', password: 'password123' });

    console.log("Testing signInWithPassword with wrong password...");
    const res2 = await supabase.auth.signInWithPassword({ email: 'test_real_456@example.com', password: 'wrongpassword' });
    console.log("Error 2:", res2.error?.message);

    console.log("Testing signUp with existing email...");
    const res3 = await supabase.auth.signUp({ email: 'test_real_456@example.com', password: 'password123' });
    console.log("Error 3:", res3.error?.message);
}

test();
