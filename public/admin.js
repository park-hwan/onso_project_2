document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    const adminContent = document.getElementById('admin-content');
    
    // 관리자 로그인 폼 제출 이벤트 리스너
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // 폼 제출 기본 동작 방지

        const password = document.getElementById('password').value;

        // 비밀번호 확인을 위한 AJAX 요청
        fetch('/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 로그인 성공 시 관리자 콘텐츠 표시
                adminContent.style.display = 'block';
                fetchSubmissions();  // 제출 데이터 가져오기
            } else {
                // 로그인 실패 시 에러 메시지 표시
                alert('Invalid password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // 제출 데이터 가져오기 함수
    function fetchSubmissions() {
        fetch('/admin-submissions')
            .then(response => response.json())
            .then(data => {
                const submissionList = document.getElementById('submission-list');
                submissionList.innerHTML = '';  // 기존 목록 초기화

                // 제출 데이터 리스트 생성
                data.forEach(submission => {
                    const listItem = document.createElement('li');
                    listItem.innerText = `UID: ${submission.uid}, Nickname: ${submission.nickname}, Issue: ${submission.issue.title}, Rating: ${submission.rating}`;
                    submissionList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
