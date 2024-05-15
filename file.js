const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient('https://uwwosfcacyovhelyelwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3d29zZmNhY3lvdmhlbHllbHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwNDk2OTAsImV4cCI6MjAyNjYyNTY5MH0.ESLIvD0IUEhSHQrpJQIkbOSOKQZ0LvltniDjIXnxow4');

async function renameFilesInBucket(bucketName, renameFunction) {
    // List files in the bucket
    let { data: files, error } = await supabase.storage.from(bucketName).list();
    if (error) {
        console.error('Error listing files:', error);
        return;
    }

    // Array to store URLs of renamed files
    const urls = [];

    for (const file of files) {
        const oldPath = file.name;
        const newPath = renameFunction(oldPath);

        // Download the file
        const { data: downloadData, error: downloadError } = await supabase.storage.from(bucketName).download(oldPath);
        if (downloadError) {
            console.error(`Error downloading ${oldPath}:`, downloadError);
            continue;
        }

        // Upload the file with a new name
        const { error: uploadError } = await supabase.storage.from(bucketName).upload(newPath, downloadData);
        if (uploadError) {
            console.error(`Error uploading ${newPath}:`, uploadError);
            continue;
        }

        // Delete the old file
        const { error: deleteError } = await supabase.storage.from(bucketName).remove([oldPath]);
        if (deleteError) {
            console.error(`Error deleting ${oldPath}:`, deleteError);
        }

        // Add new file URL to the list
        urls.push(`https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/${bucketName}/${newPath}`);
    }

    // Output all new file URLs
    console.log('Renamed files are accessible at the following URLs:');
    urls.forEach(url => console.log(url));
}

// Example rename function with unique key generation
function renameFunction(oldName) {
    // Generate a random alphanumeric string of 9 uppercase letters
    const uniqueKey = Array.from(Array(9), () => Math.floor(Math.random() * 26) + 65).map(x => String.fromCharCode(x)).join('');
    return `${uniqueKey}`;
}

// Usage
renameFilesInBucket('khoyout', renameFunction);