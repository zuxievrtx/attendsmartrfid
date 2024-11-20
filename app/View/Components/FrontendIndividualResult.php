<?php

namespace App\View\Components;

use Closure;
use App\SmExamType;
use Illuminate\View\Component;
use Illuminate\Contracts\View\View;

class FrontendIndividualResult extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        $exam_types = SmExamType::where('school_id', app('school')->id)->get();
        return view('components.' . activeTheme() . '.frontend-individual-result', compact('exam_types'));
    }
}
