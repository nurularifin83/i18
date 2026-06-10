<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Vendor;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Approve vendor
Route::put('/vendors/{id}/approve', function ($id) {
    $vendor = Vendor::findOrFail($id);

    $vendor->update([
        'status' => 'Approved'
    ]);

    return $vendor;
});

// Reject vendor
Route::put('/vendors/{id}/reject', function ($id) {
    $vendor = Vendor::findOrFail($id);

    $vendor->update([
        'status' => 'Rejected'
    ]);

    return $vendor;
});

// Update vendor
Route::put('/vendors/{id}', function (
    Request $request,
    $id
) {

    $vendor = Vendor::findOrFail($id);

    $vendor->update([
        'vendor_name' => $request->vendor_name,
        'email' => $request->email,
        'status' => $request->status,
    ]);

    return $vendor;
});

// Delete vendor
Route::delete('/vendors/{id}', function ($id) {
    $vendor = Vendor::findOrFail($id);

    $vendor->delete();

    return response()->json([
        'message' => 'Vendor deleted'
    ]);
});

// Create data
Route::post('/vendors', function (Request $request) {

    return Vendor::create([
        'vendor_name' => $request->vendor_name,
        'email' => $request->email,
        'status' => $request->status
    ]);
});

// Vendor
Route::get('/vendors', [VendorController::class, 'index']);

// Login
Route::post('/login', function (Request $request) {

    $credentials = $request->validate([
        'email' => ['required'],
        'password' => ['required'],
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $request->session()->regenerate();

    return response()->json([
        'message' => 'Login success',
        'user' => Auth::user()
    ]);
});

// Log out
Route::post('/logout', function (Request $request) {
    auth()->guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Logout success'
    ]);
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
