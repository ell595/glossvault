<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;

class CollectionController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get User ID from API TOKEN
            $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;
            $user = User::select('username')->whereId($user_id)->get();
            // Assign all collections to variable and return it
            // Also attach each collections' polishes to the object
            $collections = User::whereId($user_id)->first()->collections()->get();
            foreach ($collections as $collection) {
                $collection['glosses'] = $collection->getGlosses();
            }
    
            return response()->json([
                $collections,
                $user,
                'status' => true
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        /*return response()->json([
            'message' => 'cheese'
        ], 200);*/
    }

    public function show(Request $request)
    {
        try {

            $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;
            
            $collections = User::whereId($user_id)->first()->collections()->where('id', $request->collectionId)->get();
            foreach ($collections as $collection) {
                $collection['glosses'] = $collection->getGlosses();
            }
            
            return response()->json([
                $collections,
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
            // Get User ID from API TOKEN
            $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;

            // Create collection and add to pivot table
            $collection = Collection::create([
                'name' => $request->name
            ]);
            $collection->addReferences($user_id);

            return response()->json([
                $collection,
                'status' => true,
                'message' => "Collection, $collection->name, created successfully!"
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
            // Delete Collection, will cascade to include all cinnected polisesh
            Collection::whereId($request->collection_id)->first()->deleteReferences();

            return response()->json([
                'status' => true,
                'message' => "Collection deleted successfully!"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);    
        }
    }    
}

