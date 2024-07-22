<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class Gloss extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'colour', 'brand', 'image_path'];

    protected $table = 'glosses';

    public function deleteReferences()
    {
        DB::delete('delete from collections_glosses where gloss_id = ?', [$this->id]);
        $this->delete();
    }

    public function addReferences(Request $request)
    {
        DB::insert('insert into collections_glosses (collection_id, gloss_id) values (?, ?)', [$request->collection_id, $this->id]);
    }
}