<?php
 
namespace App\Http\Middleware;
 
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
 
class ValidateAPIToken
{
    public function handle(Request $request, Closure $next): Response
    {
            // Ensure user is logged in by validating Request contains an API TOKEN
            $validator = Validator::make($request->only(['token']), [
                'token' => 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Please log in!'
                ], 403);
            }

            return $next($request);
            
    }
}