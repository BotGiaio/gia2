<section id="top" class="w-full px-6 pt-3 overflow-hidden bg-white xl:px-8 " data-tails-scripts="//unpkg.com/alpinejs">

    @include('wpboxlanding::landing.partials.topbar')
    @include('wpboxlanding::landing.partials.nav')


    <div class="container pt-10 mx-auto text-left md:text-center">


        <div class="relative max-w-4xl mx-auto">
            <div class="flex flex-col items-start sm:items-center">
                <div class="flex items-center mb-3 w-full gap-2 px-3 py-2 text-gray-500 border rounded-full bg-gray-50 sm:w-auto">
                    <svg class="w-6 h-6" viewBox="56.329999999999984 457.15000000000003 2387.3400000000006 1585.74" xmlns="http://www.w3.org/2000/svg">
                        <linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 2500)" gradientUnits="userSpaceOnUse" x1="573.85" x2="2217.65" y1="1291.09" y2="1208.07">
                            <stop offset="0" stop-color="#0064e1" />
                            <stop offset=".4" stop-color="#0064e1" />
                            <stop offset=".83" stop-color="#0073ee" />
                            <stop offset="1" stop-color="#0082fb" />
                        </linearGradient>
                        <linearGradient id="b" gradientTransform="matrix(1 0 0 -1 0 2500)" gradientUnits="userSpaceOnUse" x1="400.24" x2="400.24" y1="888.86" y2="1494.91">
                            <stop offset="0" stop-color="#0082fb" />
                            <stop offset="1" stop-color="#0064e0" />
                        </linearGradient>
                        <path d="M314.19 1502.88c0 91.16 20 161.14 46.16 203.48 34.29 55.46 85.43 79 137.57 79 67.24 0 128.76-16.69 247.31-180.66 95-131.42 206.89-315.89 282.19-431.54l127.52-195.93c88.58-136.07 191.11-287.33 308.67-389.86 96-83.69 199.5-130.18 303.69-130.18 174.93 0 341.55 101.37 469.07 291.49 139.56 208.21 207.3 470.48 207.3 741.12 0 160.9-31.71 279.12-85.68 372.52-52.13 90.32-153.75 180.57-324.69 180.57v-257.57c146.37 0 182.89-134.5 182.89-288.42 0-219.34-51.14-462.75-163.8-636.68-79.94-123.37-183.55-198.75-297.54-198.75-123.29 0-222.5 93-334 258.77-59.28 88.09-120.13 195.43-188.46 316.56l-75.22 133.25C1006.09 1638 967.81 1699 892.26 1799.68 759.85 1976 646.77 2042.85 497.92 2042.85c-176.59 0-288.25-76.47-357.41-191.7-56.45-93.89-84.18-217.1-84.18-357.48z" fill="#0081fb" />
                        <path d="M259.65 766.82c118.22-182.23 288.83-309.67 484.51-309.67 113.32 0 226 33.54 343.62 129.6 128.68 105 265.83 278 436.94 563l61.35 102.25c148.11 246.74 232.37 373.68 281.69 433.54 63.42 76.87 107.84 99.79 165.54 99.79 146.37 0 182.89-134.5 182.89-288.42l227.48-7.14c0 160.9-31.71 279.12-85.68 372.52-52.13 90.32-153.75 180.57-324.69 180.57-106.27 0-200.41-23.08-304.52-121.3-80-75.38-173.6-209.29-245.58-329.67l-214.11-357.65c-107.42-179.49-206-313.32-263-373.93C944.73 795.13 865.86 716.43 740 716.43c-101.86 0-188.37 71.48-260.76 180.82z" fill="url(#a)" />
                        <path d="M740 716.43c-101.86 0-188.37 71.48-260.76 180.82-102.37 154.5-165 384.63-165 605.63 0 91.16 20 161.14 46.16 203.48l-219.89 144.79c-56.45-93.89-84.18-217.1-84.18-357.48 0-255.29 70.07-521.37 203.32-726.85 118.22-182.23 288.83-309.67 484.51-309.67z" fill="url(#b)" />
                    </svg>
                    <span class="text-xs sm:text-sm">{{ __('wpbox.meta_verified_tech_provider') }}</span>
                </div>
            </div>
            <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span class="">{{ __('wpbox.header_pt1')}}</span> <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline" data-primary="green-400">{{ __('wpbox.header_pt2')}}</span> <span class="">{{ __('wpbox.header_pt3')}} 🚀</span>
            </h1>

            <p class="mt-8 mb-10 text-sm text-left text-gray-500 sm:text-base md:text-lg md:max-w-xxl md:text-center md:mx-auto">
                {{ __('wpbox.header_subtitle') }}
            </p>
            @if (!config('settings.disable_registration_page',false))
            <a href="{{ route('register') }}" class="relative w-full px-12 py-5 mt-10 text-xl font-semibold leading-5 text-center text-white capitalize bg-gray-900 md:w-auto hover:bg-gray-800 focus:outline-none focus:bg-gray-800 md:mx-0" data-rounded="" data-primary="gray-900">
                {{ __('wpbox.start_now') }}
            </a>
            @endif
        </div>

        <div class="box-content relative w-full h-64 max-w-6xl pb-0 mx-auto mt-16 overflow-hidden rounded-b-none lg:pb-32 md:h-88 lg:h-96 rounded-2xl" data-rounded="rounded-2xl" data-rounded-max="rounded-full">
            <img src="{{ asset('uploads/default/wpbox/header.png')}}" class="absolute object-cover object-top w-full h-auto">
        </div>
    </div>
</section>