<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Screenshot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ScreenshotController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // $request->validate([
        //     'screenshot' => 'required|image|max:10240',
        //     'taken_at' => 'required|date'
        // ]);

        logger($request->all());

        $path = $request->file('screenshot')->store('screenshots', 'public');

        $screenshot = Screenshot::create([
            'file_path' => $path,
            'taken_at' => $request->taken_at
        ]);

        return response()->json($screenshot, 201);
    }

    public function index(Request $request): JsonResponse
    {
        $screenshots = Screenshot::query()
            ->when($request->date, function ($query, $date) {
                return $query->whereDate('taken_at', $date);
            })
            ->latest('taken_at')
            ->paginate(20);

        return response()->json($screenshots);
    }

    public function show(Screenshot $screenshot): JsonResponse
    {
        return response()->json($screenshot);
    }

    public function destroy(Screenshot $screenshot): JsonResponse
    {
        Storage::disk('public')->delete($screenshot->file_path);
        $screenshot->delete();

        return response()->json(null, 204);
    }
}