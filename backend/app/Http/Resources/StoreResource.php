<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'logoUrl' => $this->logoUrl,
            'bannerUrl' => $this->bannerUrl,
            'status' => $this->status,
            'verificationScore' => $this->verificationScore,
            'riskScore' => $this->riskScore,
            'phone' => $this->phone,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'rating' => $this->rating,
            'reviewCount' => $this->reviewCount,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'productCount' => $this->whenCounted('products', $this->products_count, 0),
        ];
    }
}
