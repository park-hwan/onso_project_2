document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault();  // 폼 제출 기본 동작 방지

    // 입력 필드에서 값들을 가져옵니다
    const uid = window.location.pathname.split('/')[2];  // URL에서 UID 추출
    const nickname = document.getElementById('nickname').value;
    const issueId = document.getElementById('issue').value;

    // 서버로 AJAX 요청을 보냅니다
    fetch('/submit-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, issueId, nickname })
    })
    .then(response => response.json())  // 서버 응답을 JSON으로 변환
    .then(data => {
        // 결과를 페이지에 표시합니다
        document.getElementById('result').innerText = `Received data: ${data.message}`;
    })
    .catch(error => {
        // 에러가 발생하면 콘솔에 로그를 남기고 사용자에게 알립니다
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred';
    });
});
