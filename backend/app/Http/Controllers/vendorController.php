<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;

class vendorController extends Controller
{
   public function index(Request $request)
   {
    $search = $request->search;

    $vendors = Vendor::when($search, function ($query) use ($search) {
        $query->where('vendor_name', 'ilike', "%{$search}%")
              ->orWhere('email', 'ilike', "%{$search}%");
    })->paginate(5);

    return response()->json($vendors);
    }
}
