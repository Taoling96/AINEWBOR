// ===== 粒子背景动画 =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        // 移动粒子
        p.x += p.vx;
        p.y += p.vy;

        // 边界循环
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // 画粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        // 画连线
        for (let j = i + 1; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// ===== FAQ 手风琴交互 =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== 移动端菜单 =====
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// ===== 滚动动画 =====
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.concept-card, .tool-card, .path-step, .faq-item').forEach(el => {
    observer.observe(el);
});

// ===== 导航栏滚动效果 =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== 工具详情弹窗 =====
const toolDetails = {
    chatgpt: {
        icon: '💬',
        badge: '对话类',
        title: 'ChatGPT',
        html: `
            <p>ChatGPT 是由 OpenAI 开发的 AI 对话助手，是目前全球最受欢迎的 AI 工具之一。它能理解自然语言，并以对话的方式回答你的各种问题。</p>
            <hr class="modal-divider">
            <h3>🎯 能帮你做什么</h3>
            <ul>
                <li>回答知识性问题 — 从历史到科学，几乎无所不知</li>
                <li>写作辅助 — 帮你写邮件、文章、报告、文案</li>
                <li>翻译 — 支持多种语言互译，质量很高</li>
                <li>头脑风暴 — 帮你想创意、列提纲、分析问题</li>
                <li>学习辅导 — 像私人老师一样解释复杂概念</li>
                <li>代码编写 — 即使你不懂编程，也能帮你写简单代码</li>
            </ul>
            <h3>📝 新手使用技巧</h3>
            <ul>
                <li>提问越具体，回答越好。比如"帮我写一封请假邮件，原因是感冒"比"帮我写邮件"好得多</li>
                <li>可以要求它换一种方式回答："用更简单的话再说一遍"</li>
                <li>可以追问和纠正："不对，我想要的是……"</li>
                <li>让它扮演角色："假设你是一个面试官，问我 3 个问题"</li>
            </ul>
            <h3>💰 费用说明</h3>
            <p>免费版（GPT-3.5）足够日常使用。付费版（Plus，约 $20/月）可以使用更强的 GPT-4 模型，回答更准确、更智能。</p>
            <div class="modal-tip">💡 新手建议：先用免费版体验，等你觉得需要更好的回答质量时再考虑升级。</div>
        `
    },
    midjourney: {
        icon: '🎨',
        badge: '图像类',
        title: 'Midjourney / DALL·E',
        html: `
            <p>AI 绘画工具可以根据你的文字描述生成图片。你不需要任何绘画技能，只需要用语言描述你想要的画面，AI 就能帮你创作出来。</p>
            <hr class="modal-divider">
            <h3>🎯 能帮你做什么</h3>
            <ul>
                <li>生成插画和艺术作品 — 各种风格都能驾驭</li>
                <li>设计 Logo 和图标 — 快速生成设计方案</li>
                <li>制作社交媒体配图 — 再也不用到处找图了</li>
                <li>产品概念图 — 把你脑海中的想法可视化</li>
                <li>头像和壁纸 — 生成独一无二的个人素材</li>
            </ul>
            <h3>🔧 主流工具对比</h3>
            <ul>
                <li>Midjourney — 画质最高，艺术感最强，适合追求美感的创作</li>
                <li>DALL·E（ChatGPT 内置）— 最方便，直接在对话中生成图片</li>
                <li>Stable Diffusion — 开源免费，可以在自己电脑上运行</li>
            </ul>
            <h3>📝 新手使用技巧</h3>
            <ul>
                <li>描述要具体：包含主体、风格、颜色、光线等细节</li>
                <li>可以参考艺术风格："油画风格""赛博朋克风格""水彩风格"</li>
                <li>不满意可以反复调整描述，逐步接近你想要的效果</li>
                <li>英文描述通常比中文效果更好</li>
            </ul>
            <div class="modal-tip">💡 新手建议：从 DALL·E 开始（ChatGPT 里直接用），最简单。等你想要更高质量的图片时，再尝试 Midjourney。</div>
        `
    },
    kiro: {
        icon: '💻',
        badge: '编程类',
        title: 'Kiro / Cursor',
        html: `
            <p>AI 编程助手是一类能帮你写代码的工具。即使你完全不懂编程，也可以通过自然语言对话，让 AI 帮你创建网站、小程序、自动化脚本等。这个网站就是用 Kiro 做的！</p>
            <hr class="modal-divider">
            <h3>🎯 能帮你做什么</h3>
            <ul>
                <li>创建网站 — 描述你想要的网站，AI 帮你写出来</li>
                <li>写自动化脚本 — 比如批量处理文件、自动发邮件</li>
                <li>数据处理 — 帮你分析 Excel 数据、生成图表</li>
                <li>学习编程 — AI 一边帮你写代码，一边解释每一行的意思</li>
                <li>修复 Bug — 把错误信息告诉 AI，它帮你找到问题</li>
            </ul>
            <h3>🔧 主流工具对比</h3>
            <ul>
                <li>Kiro — AI 原生 IDE，自带强大的 AI 编程能力，适合从零开始</li>
                <li>Cursor — 基于 VS Code 的 AI 编辑器，对开发者很友好</li>
                <li>GitHub Copilot — 代码自动补全，适合已有编程基础的人</li>
            </ul>
            <h3>📝 新手使用技巧</h3>
            <ul>
                <li>从简单项目开始：先做一个个人网页或待办事项应用</li>
                <li>不懂就问：让 AI 解释它写的每一行代码</li>
                <li>分步骤来：把大任务拆成小步骤，一步步让 AI 帮你完成</li>
                <li>不要怕出错：代码出错很正常，把错误信息告诉 AI 就行</li>
            </ul>
            <div class="modal-tip">💡 新手建议：安装 Kiro，打开后直接告诉它你想做什么。比如"帮我做一个个人简历网页"，它会一步步帮你完成。</div>
        `
    },
    suno: {
        icon: '🎵',
        badge: '音乐类',
        title: 'Suno AI',
        html: `
            <p>Suno AI 是一个 AI 音乐创作工具，你只需要输入歌词或描述你想要的音乐风格，它就能帮你创作一首完整的歌曲，包括旋律、编曲和演唱。</p>
            <hr class="modal-divider">
            <h3>🎯 能帮你做什么</h3>
            <ul>
                <li>创作原创歌曲 — 输入歌词，AI 帮你谱曲并演唱</li>
                <li>生成背景音乐 — 为视频、播客制作配乐</li>
                <li>探索音乐风格 — 尝试流行、摇滚、古典、说唱等各种风格</li>
                <li>写生日歌 — 为朋友定制专属的生日歌曲</li>
                <li>学习音乐 — 通过 AI 了解不同音乐风格的特点</li>
            </ul>
            <h3>📝 新手使用技巧</h3>
            <ul>
                <li>可以只描述风格，让 AI 自动生成歌词："一首欢快的关于夏天的流行歌曲"</li>
                <li>也可以自己写歌词，让 AI 来谱曲和演唱</li>
                <li>尝试不同风格标签：pop、rock、jazz、chinese folk 等</li>
                <li>不满意可以重新生成，每次结果都不一样</li>
            </ul>
            <h3>💰 费用说明</h3>
            <p>免费用户每天有一定的创作额度（约 5 首歌）。付费版可以获得更多额度和更高音质。</p>
            <div class="modal-tip">💡 新手建议：先试试让它创作一首简单的歌，比如"一首关于周末的轻松民谣"，感受一下 AI 音乐的魅力。</div>
        `
    }
};

const modal = document.getElementById('toolModal');
const modalIcon = document.getElementById('modalIcon');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// 点击卡片打开弹窗
document.querySelectorAll('.tool-card[data-tool]').forEach(card => {
    card.addEventListener('click', () => {
        const toolKey = card.getAttribute('data-tool');
        const detail = toolDetails[toolKey];
        if (!detail) return;

        modalIcon.textContent = detail.icon;
        modalBadge.textContent = detail.badge;
        modalTitle.textContent = detail.title;
        modalBody.innerHTML = detail.html;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 关闭弹窗
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
