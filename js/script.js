document.addEventListener('DOMContentLoaded', function() {
    // 1. Loader 加载动画
    const loader = document.querySelector('.loader');
    if(loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1200);
    }

    // 2. 滚动视差动画 (Scroll Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 3. 自定义鼠标跟随逻辑
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // 鼠标悬停放大效果
        const hoverTargets = document.querySelectorAll('a, button, .problem-card, .options label');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(162, 123, 92, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = '#a27b5c';
            });
        });
    }
});

// 4. Tab 切换功能 (用于 Lifestyle 页面)
function openTab(evt, tabName) {
    let i, content, tablinks;
    
    content = document.getElementsByClassName("guide-content");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none"; // 先隐藏
        content[i].classList.remove("active");
    }
    
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    document.getElementById(tabName).style.display = "block";
    // 强制重绘以触发动画
    setTimeout(() => {
        document.getElementById(tabName).classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}

// 5. 问卷分析逻辑 (用于 Analysis 页面)
function analyzeResult() {
    const resultDiv = document.getElementById('result-area');
    const form = document.getElementById('quizForm');
    
    // 检查是否有未选项目
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    if(q1 && q2 && q3) {
        // 计算分数 (简单的模拟逻辑)
        let score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value);
        let advice = "";
        
        if(score <= 5) {
            advice = "<strong>【状态良好】</strong><br>您的体态意识较好，建议继续保持日常活动，注意不要长时间保持同一姿势。";
        } else if (score <= 7) {
            advice = "<strong>【轻度风险：上交叉综合症倾向】</strong><br>您可能存在头前引或圆肩的初期迹象。建议重点查看《生活方式指南》中的“感知中枢”板块，加强背部肌群力量。";
        } else {
            advice = "<strong>【高度关注：身体代偿明显】</strong><br>数据显示您有较高的久坐风险及骨盆前倾/高低肩倾向。建议立即开始核心稳定性训练，并尝试改善办公环境的人体工学设置。";
        }

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <h3 style="color:#a27b5c; margin-bottom:15px; font-family:'Noto Serif SC', serif;">分析报告</h3>
            <p style="color:#444; line-height:1.8;">${advice}</p>
            <div style="margin-top:20px; padding-top:20px; border-top:1px solid #eee;">
                <a href="lifestyle.html" style="font-weight:bold; color:#2c3639; border-bottom:1px solid #2c3639;">前往生活指南获取训练方案 &rarr;</a>
            </div>
        `;
        resultDiv.scrollIntoView({behavior: "smooth"});
    } else {
        alert('请完成所有题目以便我们为您生成分析报告。');
    }
}