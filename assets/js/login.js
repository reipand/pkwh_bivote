document.addEventListener('DOMContentLoaded', () => {
    const loginFormSiswa = document.getElementById('login-form-siswa');
    const loginFormGuru = document.getElementById('login-form-guru');
    const nisInput = document.getElementById('nis');
    const passwordInput = document.getElementById('password');
    const nikInput = document.getElementById('nik');
    const passwordGuruInput = document.getElementById('password_guru');
    const loginBtnSiswa = document.getElementById('login-btn-siswa');
    const loginBtnGuru = document.getElementById('login-btn-guru');
    const feedbackMessage = document.getElementById('feedback-message');

    // Handler untuk form siswa
    if (loginFormSiswa) {
        loginFormSiswa.addEventListener('submit', async (e) => {
            e.preventDefault();

            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('text-red-500', 'text-green-500');

            loginBtnSiswa.disabled = true;
            loginBtnSiswa.textContent = 'Memproses...';

            if (nisInput.value.trim() === '' || passwordInput.value.trim() === '') {
                feedbackMessage.textContent = 'NIS dan Password tidak boleh kosong.';
                feedbackMessage.classList.add('text-red-500');
                loginBtnSiswa.disabled = false;
                loginBtnSiswa.textContent = 'LOGIN SISWA';
                return;
            }

            const formData = new FormData(loginFormSiswa);

            try {
                const response = await fetch('../api/login_siswa.php', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Jaringan bermasalah atau server error');
                }

                const data = await response.json();

                if (data.status === 'success' && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    feedbackMessage.textContent = data.message || 'Terjadi kesalahan tidak dikenal.';
                    feedbackMessage.classList.add('text-red-500');
                }
            } catch (error) {
                feedbackMessage.textContent = 'Terjadi kesalahan saat menghubungi server. Silakan coba lagi.';
                feedbackMessage.classList.add('text-red-500');
            } finally {
                loginBtnSiswa.disabled = false;
                loginBtnSiswa.textContent = 'LOGIN SISWA';
            }
        });
    }

    // Handler untuk form guru
    if (loginFormGuru) {
        loginFormGuru.addEventListener('submit', async (e) => {
            e.preventDefault();

            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('text-red-500', 'text-green-500');

            loginBtnGuru.disabled = true;
            loginBtnGuru.textContent = 'Memproses...';

            if (nikInput.value.trim() === '' || passwordGuruInput.value.trim() === '') {
                feedbackMessage.textContent = 'NIK dan Password tidak boleh kosong.';
                feedbackMessage.classList.add('text-red-500');
                loginBtnGuru.disabled = false;
                loginBtnGuru.textContent = 'LOGIN GURU';
                return;
            }

            const formData = new FormData(loginFormGuru);

            try {
                const response = await fetch('../api/login_guru.php', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Jaringan bermasalah atau server error');
                }

                const data = await response.json();

                if (data.status === 'success' && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    feedbackMessage.textContent = data.message || 'Terjadi kesalahan tidak dikenal.';
                    feedbackMessage.classList.add('text-red-500');
                }
            } catch (error) {
                feedbackMessage.textContent = 'Terjadi kesalahan saat menghubungi server. Silakan coba lagi.';
                feedbackMessage.classList.add('text-red-500');
            } finally {
                loginBtnGuru.disabled = false;
                loginBtnGuru.textContent = 'LOGIN GURU';
            }
        });
    }
});