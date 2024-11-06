<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuruBkTable extends Migration
{
    public function up()
    {
        Schema::create('guru_bk', function (Blueprint $table) {
            $table->id('id_guru_bk');
            $table->string('nama_guru_bk', 255);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guru_bk');
    }
}
