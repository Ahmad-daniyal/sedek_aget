<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class StoreDetailResource extends StoreResource
{
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ]);
    }
}
