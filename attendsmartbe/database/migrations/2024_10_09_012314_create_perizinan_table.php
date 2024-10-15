<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerizinanTable extends Migration
{
    public function up()
    {
        Schema::create('perizinan', function (Blueprint $table) {
            $table->id('id_perizinan');
            $table->unsignedBigInteger('id_presensi_siswa');
            $table->unsignedBigInteger('id_guru_bk');
            $table->date('tanggal_persetujuan')->nullable();
            $table->enum('status', ['Disetujui', 'Ditolak', 'Ditinjau']);
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('perizinan');
    }
}
