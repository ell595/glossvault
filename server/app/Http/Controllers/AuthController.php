<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function getUser(Request $request)
    {
        Log::info($request);
        try {
            $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;
            Log::info($user_id);
            $user = User::select('username')->whereId($user_id)->get();
    
            return response()->json([
                $user,
                'status' => true
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function registerUser(Request $request)
    {
        try {
            // Validate data submitted via request
            $this->validate($request, [
                'email' => ['required', 'email', 'unique:users'],
                'username' => 'required',
                'password' => 'required'
            ]);

            // Create new user
            $user = User::create([
                'email' => $request->email,
                'username' => $request->username,
                'password' => Hash::make(request('password'))
            ]);

            // Returning API TOKEN ensures user is logged in when they register
            return response()->json([
                'status' => true,
                'message' => 'User registered successfully!',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'data' => $user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logInUser(Request $request)
    {
        Log::info('route hit');
        try {
            // Validate data submitted via request
            $this->validate($request, [
                'email' => ['required', 'email'],
                'password' => 'required'
            ]);

            // Get user from email
            $user = User::where('email', $request->email)->first();

            // If user exists, compare passwords then return API TOKEN
            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    return response()->json([
                        'status' => true,
                        'message' => 'User successfully logged in!',
                        'token' => $user->createToken("API TOKEN")->plainTextToken,
                        'data' => $user
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Credentials do no match our records'
                    ], 422);
                }
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logOutUser(Request $request)
    {
        Log::info($request);

        try {
            // Note: API TOKEN must still be removed from LocalStorage
            $user_id = PersonalAccessToken::findToken($request->token)->tokenable->id;
            if ($user_id) {
                DB::table('personal_access_tokens')->where('tokenable_id', $user_id)->delete();
            }

            return response()->json([
                'status' => true,
                'message' => 'User successfully logged out!'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
