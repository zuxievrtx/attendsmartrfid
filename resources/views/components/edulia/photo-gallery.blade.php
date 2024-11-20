<div class="row mb-minus-24">
    @if ($photoGalleries->isEmpty() && auth()->check() && auth()->user()->role_id == 1)
        <p class="text-center text-danger">@lang('edulia.no_data_available_please_go_to') <a target="_blank"
                href="{{ URL::to('/photo-gallery') }}">@lang('edulia.photo_gallery')</a></p>
    @else
        @foreach ($photoGalleries as $photoGallery)
            <div class="col-lg-{{ $column }} 
            @if ($column == '12' )
                col-md-12
                @elseif ($column == '6')
                col-md-12
                @elseif ($column == '4')
                col-md-6 col-sm-12
                @elseif ($column == '3')
                col-md-4 col-sm-6
                @elseif ($column == '2')
                col-md-3 col-sm-4 col-6
                @elseif ($column == '1')
                col-md-2 col-sm-3 col-6
            @endif
            ">
                <a href='{{ route('frontend.gallery-details', $photoGallery->id) }}' class="gallery_item">
                    <div class="gallery_item_img"><img src="{{ asset($photoGallery->feature_image) }}" alt="">
                    </div>
                    <div class="gallery_item_inner">
                        <h4>{{ $photoGallery->name }}</h4>
                        <p>{!! Str::limit($photoGallery->description, 100,'...') !!}</p>
                    </div>
                </a>
            </div>
        @endforeach
    @endif
</div>
