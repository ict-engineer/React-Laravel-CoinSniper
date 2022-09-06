<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Validator;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
      $this->middleware('auth:api', ['except' => ['login', 'register', 'passwordReset', 'forgotPassword']]);
  }

  public function forgotPassword(Request $request){
    $input = $request->only('email');
    $validator = Validator::make($input, [
        'email' => "required|email"
    ]);
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $count = User::where('email', $request->email)->count();
    if(!$count)
    {
      return response()->json(['message'=>'There is no user with this email.'], 422);
    }
    $response = Password::sendResetLink($input);

    $message = $response == Password::RESET_LINK_SENT ? 'Mail send successfully' : GLOBAL_SOMETHING_WANTS_TO_WRONG;
    
    return response()->json($message);
  }

  public function passwordReset(Request $request){
    $input = $request->only('email','token', 'password', 'password_confirmation');
    $validator = Validator::make($input, [
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|confirmed|min:8',
    ]);
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }
    $response = Password::reset($input, function ($user, $password) {
        $user->password = bcrypt($password);
        $user->save();
    });
    $message = $response == Password::PASSWORD_RESET ? 'Password reset successfully' : GLOBAL_SOMETHING_WANTS_TO_WRONG;
    return response()->json($message);
  }

  /**
   * Get a JWT via given credentials.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request){
    try{
      $validator = Validator::make($request->all(), [
          'email' => 'required|email',
          'password' => 'required|string',
      ]);

      if ($validator->fails()) {
          return response()->json($validator->errors(), 422);
      }
      if (! $token = auth()->attempt($validator->validated())) {
          return response()->json(['error' => 'Unauthorized'], 401);
      }
    } catch(Exception $e){
      return response()->json($e, 422);
    }

      return $this->createNewToken($token);
  }

  /**
   * Register a User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(Request $request) {
    try{
      $data = $request->all(); 
      $validator = Validator::make($request->all(), [
        'full_name' => 'required|string|between:1,100',
        'email' => 'required|string|email|max:100|unique:users',
        'password' => 'required|string|min:8',
      ]);

      if($validator->fails()){
        return response()->json($validator->errors(), 400);
      }

      $user = User::create(array_merge(
        $validator->validated(),
        ['email' => $request->email, 'password' => bcrypt($request->password), "user_role" => 'user', 'full_name' => $request->full_name]
      ));
      event(new Registered($user));
      $token = auth()->attempt(array('email' => $request->email, 'password' => $request->password));
    } catch(Exception $e){
      return response()->json($e, 422);
    }
    
    return response()->json([
        'message' => 'User successfully registered',
        'access_token' => $token,
        'user' => auth()->user(),
    ], 201);
  }


  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout() {
      auth()->logout();

      return response()->json(['message' => 'User successfully signed out']);
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */

  

  public function changePassword(Request $request) {
    $user = auth()->user();

    if(!\Hash::check($request->oldPassword, $user->password))
      return response()->json(["message" => "Old password not matched."], 422);  

    $user->password = bcrypt($request->password);
    $user->save();

    return response()->json(['message' => 'Password changed successfully']);
  }

  public function getUserInfo()
  {
    return response()->json([
      'user' => auth()->user()
    ]);
  }

  protected function createNewToken($token){
      return response()->json([
          'access_token' => $token,
          'token_type' => 'bearer',
          'expires_in' => auth()->factory()->getTTL() * 60,
          'user' => auth()->user()
      ]);
  }
}
