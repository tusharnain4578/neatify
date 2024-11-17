<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MoveReactBuildToPublicDirectory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'move-react-build';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Moves the react production build from client/dist directory to laravel public directory to serve react app as static asset.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $source = base_path('client/dist');
        $destination = public_path();

        // Check if the source folder exists
        if (!File::exists($source)) {
            $this->error("Source folder does not exist: $source");
            return;
        }

        // Ensure the destination folder exists
        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        // Move all files and directories from client/dist to public
        try {
            $this->info("Moving React build files from $source to $destination...");
            File::copyDirectory($source, $destination);
            $this->info("React build files moved successfully!");
        } catch (\Exception $e) {
            $this->error("An error occurred: " . $e->getMessage());
        }
    }
}
