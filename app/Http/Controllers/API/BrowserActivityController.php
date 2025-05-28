<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BrowserActivity;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BrowserActivityController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // $request->validate([
        //     'url' => 'required|url|max:2048',
        //     'title' => 'required|string|max:255',
        //     'tab_id' => 'nullable|string|max:100',
        //     'window_id' => 'nullable|string|max:100',
        //     'started_at' => 'required|date'
        // ]);

        logger($request->all());

        $activity = BrowserActivity::create([
            'url' => $request->url,
            'title' => $request->title,
            'tab_id' => $request->tab_id,
            'window_id' => $request->window_id,
            'started_at' => $request->started_at
        ]);

        return response()->json($activity, 201);
    }

    public function index(Request $request): JsonResponse
    {
        $activities = BrowserActivity::query()
            ->when($request->date, function ($query, $date) {
                return $query->whereDate('started_at', $date);
            })
            ->latest('started_at')
            ->paginate(20);

        return response()->json($activities);
    }

    public function update(Request $request, BrowserActivity $activity): JsonResponse
    {
        $request->validate([
            'ended_at' => 'required|date|after:started_at'
        ]);

        $activity->update([
            'ended_at' => $request->ended_at
        ]);

        return response()->json($activity);
    }
}