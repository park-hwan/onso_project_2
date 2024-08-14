const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 제출된 데이터 저장 배열
const submissions = [];

// UID 처리 라우트 (URL에 /uid/:uid 형식으로 접근)
app.get('/uid/:uid', (req, res) => {
    const uid = req.params.uid;
    res.send(`
        <div class="container">
            <header>
                <h1>batchim</h1>
                <p>선택당한 편지지의 이름: <strong>${uid}</strong></p>
            </header>
            <div class="landing-link">
                <p>처음 오셨나요? <a href="https://batchim.framer.website/" target="_blank">랜딩페이지를 참고해주세요!</a></p>
            <form id="nickname-form">
                <label for="nickname">본인의 닉네임을 입력해주세요:</label>
                <input type="text" id="nickname" name="nickname" required placeholder="Your nickname">
                
                <label for="chosen-nickname">편지를 받으실 분의 닉네임을 입력해주세요:</label>
                <input type="text" id="chosen-nickname" name="chosen-nickname" required placeholder="Recipient's nickname">
                
                <button type="submit">송장 입력 완료하기</button>
            </form>
            <div id="result"></div>
            </div>
            <script src="/script.js"></script>
        </div>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f7fa;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                max-width: 450px;
                text-align: center;
            }
            header h1 {
                font-size: 2.5em;
                color: #3a77f2;
                margin-bottom: 20px;
                font-weight: bold;
            }
            header p {
                font-size: 1.2em;
                margin-bottom: 25px;
            }
            form label {
                display: block;
                font-weight: bold;
                margin-bottom: 5px;
                text-align: left;
            }
            form input {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1em;
            }
            button {
                width: 100%;
                padding: 12px;
                background-color: #3a77f2;
                color: #fff;
                border: none;
                border-radius: 5px;
                font-size: 1.2em;
                cursor: pointer;
            }
            button:hover {
                background-color: #335ecf;
            }
            .landing-link {
                margin-top: 20px;
            }
            .landing-link p {
                font-size: 1em;
            }
            .landing-link a {
                color: #3a77f2;
                text-decoration: none;
            }
            .landing-link a:hover {
                text-decoration: underline;
            }
        </style>
    `);
});

// 데이터 제출 라우트
app.post('/submit-issue', (req, res) => {
    const { uid, nickname, chosenNickname } = req.body;
    
    if (uid && nickname && chosenNickname) {
        submissions.push({ uid, nickname, chosenNickname });
        res.json({ message: `UID ${uid} (${nickname}) has chosen recipient: ${chosenNickname}.` });
    } else {
        res.status(400).json({ error: 'UID, nickname, or recipient nickname missing' });
    }
});

// 관리자 페이지 라우트
app.get('/admin', (req, res) => {
    res.send(`
        <h1>Admin Login</h1>
        <form id="admin-login-form">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        </form>
        <div id="admin-content" style="display:none;">
            <h2>Submissions</h2>
            <ul id="submission-list"></ul>
        </div>
        <script src="/admin.js"></script>
    `);
});

// 관리자 인증 라우트
app.post('/admin', (req, res) => {
    const { password } = req.body;
    if (password === '4321') {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// 관리자 페이지에서 제출 데이터 가져오기
app.get('/admin-submissions', (req, res) => {
    res.json(submissions);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://192.168.75.224:${port}`);
});
