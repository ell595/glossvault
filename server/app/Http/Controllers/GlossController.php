<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Storage;
use App\Models\Gloss;
use App\Models\Collection;
use Illuminate\Support\Facades\Log;

class GlossController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get all of a collections' polishes by accessing pivot table via the Collection ID
            $polishes = Collection::whereId($request->collectionId)->first()->getPolishes();

            return response()->json([
                $polishes,
                'status' => true
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            
            // Using 'hasFile' is required to access other file methods
            if ($request->hasFile('image')) {
                // First get the user ID from the API TOKEN
                $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;
                // Get the image form the request
                $image = $request->file('image');
                // Trim the whitespace from the file name
                $fileName = preg_replace('/\s+/u', '', $image->getClientOriginalName());
                // Create a file path including the user ID and concattenate file name
                $filePath = 'users/' . $user_id . '/' . 'glosses/' . $fileName;
                // Save the image to S3 
                Storage::disk('s3')->put($filePath, file_get_contents($image), 'public');
                // Get the path to save in the database
                $path = Storage::path($filePath);

                            // Create polish & add it to pivot table
            $gloss = Gloss::create([
                'name' => $request->name,
                'colour' => $request->colour,
                'brand' => $request->brand,
                'image_path' => $path
            ]);
            $gloss->addReferences($request);
            } else {
                            // Create polish & add it to pivot table
            $gloss = Gloss::create([
                'name' => $request->name,
                'colour' => $request->colour,
                'brand' => $request->brand
            ]);
            $gloss->addReferences($request);
            }
            
            
            return response()->json([
                $gloss,
                'status' => true,
                'message' => "Gloss, $gloss->name, added to collection!"
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    
    public function destroy(Request $request)
    {
        try {
            // Delete Polish from polishes table and pivot table
            Gloss::whereId($request->gloss_id)->first()->deleteReferences();

            return response()->json([
                'status' => true,
                'message' => "Polish deleted successfully!"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);    
        }
    }    
}
