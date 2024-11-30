@extends('backEnd.master')
@section('title')
    RFID Attendance Monitor
@endsection

<style>
    :root {
        --primary-color: #4a90e2;
        --success-color: #27ae60;
        --warning-color: #f39c12;
        --error-color: #e74c3c;
        --background-color: #f5f6fa;
        --card-background: #ffffff;
        --text-color: #2c3e50;
    }

    /* General Styles */
    body {
        background-color: var(--background-color);
        color: var(--text-color);
    }

    .gradient-text {
        background: linear-gradient(45deg, var(--primary-color), #9b59b6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: bold;
    }

    /* Card Styles */
    .card {
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        border: none;
        background: var(--card-background);
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    /* Student Photo Styles */
    .student-photo-container {
        width: 150px;
        height: 150px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid var(--primary-color);
    }

    #student-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Scanner Animation */
    .scanner-animation {
        height: 100px;
        position: relative;
        overflow: hidden;
        background: #f0f0f0;
        border-radius: 10px;
    }

    .scan-area {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .scan-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
        top: 0;
        transform: translateY(-100%);
    }

    .scanning .scan-line {
        animation: scanning 2s linear infinite;
    }

    @keyframes scanning {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100px); }
    }

    /* Attendance Badges */
    .attendance-badge {
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .attendance-badge.present {
        background-color: var(--success-color);
        color: white;
    }

    .attendance-badge.late {
        background-color: var(--warning-color);
        color: white;
    }

    /* Table Styles */
    .attendance-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 8px;
    }

    .attendance-table thead th {
        border: none;
        background-color: #f8f9fa;
        padding: 12px;
        font-weight: 600;
        color: var(--text-color);
    }

    .attendance-row {
        background: white;
        transition: transform 0.2s ease;
    }

    .attendance-row:hover {
        transform: scale(1.01);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .attendance-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    /* Time Display */
    .current-time {
        background: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .current-time i {
        font-size: 1.1em;
    }

    /* Student Info Styles */
    .student-info {
        padding: 8px 0;
    }

    .student-name {
        font-weight: bold;
        font-size: 1.1em;
        color: var(--text-color);
    }

    .student-class {
        color: #666;
        font-size: 0.9em;
    }

    /* RFID Input Styles */
    .primary-input {
        position: relative;
        margin-bottom: 15px;
    }

    .primary-input input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }

    .primary-input input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        outline: none;
    }

    /* Status Area Styles */
    #status-area {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin-top: 15px;
    }

    #status-text {
        font-weight: 500;
    }

    #status-text.success {
        color: var(--success-color);
    }

    #status-text.error {
        color: var(--error-color);
    }

    /* Attendance Time Display */
    .attendance-time {
        font-weight: bold;
        color: var(--primary-color);
    }

    .attendance-date {
        font-size: 0.85em;
        color: #666;
    }

    /* Animation Keyframes */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    /* Success Animation */
    .success-animation {
        animation: pulse 0.5s ease-in-out;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .col-lg-4 {
            margin-bottom: 20px;
        }

        .student-photo-container {
            width: 120px;
            height: 120px;
        }

        .attendance-table {
            font-size: 0.9em;
        }

        .attendance-badge {
            padding: 6px 12px;
            font-size: 12px;
        }
    }

    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
        :root {
            --background-color: #1a1a1a;
            --card-background: #2d2d2d;
            --text-color: #ffffff;
        }

        .attendance-table thead th {
            background-color: #333;
            color: #fff;
        }

        .attendance-row {
            background: #2d2d2d;
        }

        #status-area {
            background: #333;
        }

        .student-class {
            color: #aaa;
        }

        .attendance-date {
            color: #aaa;
        }
    }
</style>

@section('mainContent')
    <section class="sms-breadcrumb mb-40">
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <h1 class="gradient-text">RFID Attendance Monitor</h1>
                <div class="current-time">
                    <i class="fas fa-clock"></i>
                    <span id="current-time"></span>
                </div>
            </div>
        </div>
    </section>

    <section class="admin-visitor-area">
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col-lg-4">
                    <!-- Student Info Card -->
                    <div class="card student-info-card">
                        <div class="card-body text-center">
                            <div class="student-photo-container">
                                <img id="student-photo" src="{{ asset('public/images/default-student.svg') }}" alt="Student Photo">
                            </div>
                            <div class="student-details mt-3">
                                <h4 id="student-name">Waiting for scan...</h4>
                                <p id="student-class"></p>
                                <div id="attendance-status"></div>
                            </div>
                        </div>
                    </div>

                    <!-- RFID Scanner Card -->
                    <div class="card scanner-card mt-4">
                        <div class="card-body">
                            <div class="scanner-animation">
                                <div class="scan-area">
                                    <div class="scan-line"></div>
                                </div>
                            </div>
                            <div class="primary-input mt-3">
                                <input type="text"
                                       id="rfid-input"
                                       class="primary-input form-control"
                                       placeholder="RFID Number will appear here..."
                                       readonly>
                            </div>
                            <div id="status-area" class="text-center mt-3">
                                <h4>Status: <span id="status-text">Waiting for scan...</span></h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <!-- Recent Attendance Card -->
                    <div class="card attendance-card">
                        <div class="card-header">
                            <h3>Recent Attendance</h3>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover" id="attendance-table">
                                    <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Time</th>
                                        <th>Student Info</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody id="attendance-logs">
                                    <!-- Attendance logs will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('script')
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Update current time
            function updateTime() {
                const now = new Date();
                document.getElementById('current-time').textContent = now.toLocaleTimeString();
            }
            setInterval(updateTime, 1000);
            updateTime();

            let rfidInput = '';
            let processingAttendance = false;
            const rfidDisplay = document.getElementById('rfid-input');
            const statusText = document.getElementById('status-text');
            const attendanceLogs = document.getElementById('attendance-logs');
            const studentPhoto = document.getElementById('student-photo');
            const studentName = document.getElementById('student-name');
            const studentClass = document.getElementById('student-class');
            const attendanceStatus = document.getElementById('attendance-status');

            document.addEventListener('keypress', function(e) {
                if (processingAttendance) return;
                rfidInput += e.key;
                rfidDisplay.value = rfidInput;
                if (rfidInput.length === 10) {
                    processAttendance(rfidInput);
                    rfidInput = '';
                }
            });

            function processAttendance(rfidNumber) {
                processingAttendance = true;
                statusText.textContent = 'Processing...';
                activateScanAnimation();

                fetch('{{ route('rfid.process') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        rfid_number: rfidNumber
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showSuccess(data);
                            updateStudentInfo(data.data);
                            addAttendanceLog(data.data);
                            playSuccessSound();
                        } else {
                            showError(data.message);
                            playErrorSound();
                        }
                    })
                    .catch(error => {
                        showError('System error. Please try again.');
                        console.error('Error:', error);
                    })
                    .finally(() => {
                        processingAttendance = false;
                        rfidDisplay.value = '';
                        setTimeout(() => {
                            statusText.textContent = 'Waiting for scan...';
                            deactivateScanAnimation();
                        }, 3000);
                    });
            }

            function updateStudentInfo(data) {
                studentPhoto.src = data.student_photo || '{{ asset('public/backEnd/img/default-student.png') }}';
                studentName.textContent = data.student_name;
                studentClass.textContent = `${data.class_name} - ${data.section_name}`;

                const statusHtml = `
                    <div class="attendance-badge ${data.attendance_type === 'L' ? 'late' : 'present'}">
                        ${data.attendance_type === 'L' ? 'Late' : 'Present'}
                    </div>
                `;
                attendanceStatus.innerHTML = statusHtml;
            }

            function addAttendanceLog(data) {
                const row = document.createElement('tr');
                row.className = 'attendance-row';
                row.innerHTML = `
                    <td>
                        <img src="${data.student_photo || '{{ asset('public/backEnd/img/default-student.png') }}'}"
                             class="attendance-photo" alt="Student">
                    </td>
                    <td>
                        <div class="attendance-time">${data.attendance_time}</div>
                        <div class="attendance-date">${data.attendance_date}</div>
                    </td>
                    <td>
                        <div class="student-info">
                            <div class="student-name">${data.student_name}</div>
                            <div class="student-class">${data.class_name} - ${data.section_name}</div>
                        </div>
                    </td>
                    <td>
                        <span class="attendance-badge ${data.attendance_type === 'L' ? 'late' : 'present'}">
                            ${data.attendance_type === 'L' ? 'Late' : 'Present'}
                        </span>
                    </td>
                `;

                if (attendanceLogs.firstChild) {
                    attendanceLogs.insertBefore(row, attendanceLogs.firstChild);
                } else {
                    attendanceLogs.appendChild(row);
                }

                if (attendanceLogs.children.length > 10) {
                    attendanceLogs.removeChild(attendanceLogs.lastChild);
                }
            }

            function activateScanAnimation() {
                document.querySelector('.scan-area').classList.add('scanning');
            }

            function deactivateScanAnimation() {
                document.querySelector('.scan-area').classList.remove('scanning');
            }

            function playSuccessSound() {
                const audio = new Audio('{{ asset('public/backEnd/sound/success.mp3') }}');
                audio.play();
            }

            function playErrorSound() {
                const audio = new Audio('{{ asset('public/backEnd/sound/error.mp3') }}');
                audio.play();
            }
        });
    </script>
@endsection