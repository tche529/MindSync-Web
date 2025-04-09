// 导航切换
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// 语言切换
let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');

function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
    });
    langToggle.textContent = lang === 'en' ? 'CN' : 'EN'; // 更新按钮文本
}

// 点击语言切换按钮
langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    switchLang(currentLang === 'en' ? 'zh' : 'en');
});

// 默认英文
switchLang('en');

// iOS Demo 选项卡切换
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.device-content .content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            contents.forEach(content => content.classList.remove('active'));
            contents[index].classList.add('active');
        });
    });
    
    // 情绪词云初始化 - 高级版
    const canvas = document.getElementById('emotionCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // 情绪标签数据
        const emotions = [
            { text: '平静', size: 28, color: '#5c8df5', type: 'calm', weight: 0.9 },
            { text: '专注', size: 24, color: '#6e7eff', type: 'calm', weight: 0.7 },
            { text: '满足', size: 22, color: '#f5cb5c', type: 'happy', weight: 0.6 },
            { text: '放松', size: 30, color: '#7a92e0', type: 'calm', weight: 0.8 },
            { text: '好奇', size: 18, color: '#7b5dff', type: 'happy', weight: 0.5 },
            { text: '希望', size: 22, color: '#ffbb33', type: 'happy', weight: 0.6 },
            { text: '轻微焦虑', size: 16, color: '#4a5dff', type: 'anxious', weight: 0.3 },
            { text: '思考', size: 20, color: '#a8b0cf', type: 'calm', weight: 0.5 },
            { text: '安宁', size: 26, color: '#5c8df5', type: 'calm', weight: 0.7 },
            { text: '舒适', size: 23, color: '#7a92e0', type: 'calm', weight: 0.6 },
            { text: '微笑', size: 19, color: '#f5cb5c', type: 'happy', weight: 0.4 }
        ];
        
        // 情绪粒子系统
        const particleContainer = document.createElement('div');
        particleContainer.className = 'emotion-particles';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        
        const cloudContainer = canvas.closest('.emotion-cloud');
        cloudContainer.style.position = 'relative';
        cloudContainer.appendChild(particleContainer);
        
        // 创建脉冲背景
        const emotionPulse = document.createElement('div');
        emotionPulse.className = 'emotion-pulse';
        cloudContainer.appendChild(emotionPulse);
        
        // 添加情绪粒子
        function createEmotionParticles() {
            // 清除现有粒子
            particleContainer.innerHTML = '';
            
            // 按情绪类型统计权重
            const typeWeights = {};
            emotions.forEach(emotion => {
                if (!typeWeights[emotion.type]) {
                    typeWeights[emotion.type] = 0;
                }
                typeWeights[emotion.type] += emotion.weight;
            });
            
            // 粒子总数
            const totalParticles = 30;
            
            // 为每种情绪类型创建粒子
            for (const type in typeWeights) {
                // 按权重比例计算粒子数
                const typeWeight = typeWeights[type];
                const totalWeight = Object.values(typeWeights).reduce((a, b) => a + b, 0);
                const particleCount = Math.round((typeWeight / totalWeight) * totalParticles);
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = `emotion-particle ${type}`;
                    
                    // 随机大小 (5-15px)
                    const size = 5 + Math.random() * 10;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // 随机位置
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    particle.style.left = `${left}%`;
                    particle.style.top = `${top}%`;
                    
                    // 随机动画延迟和时长
                    const delay = Math.random() * 5;
                    const duration = 3 + Math.random() * 4;
                    particle.style.animation = `${Math.random() > 0.5 ? 'float' : 'pulse'} ${duration}s ease-in-out infinite ${delay}s`;
                    
                    particleContainer.appendChild(particle);
                }
            }
            
            // 添加星星效果
            for (let i = 0; i < 15; i++) {
                const star = document.createElement('div');
                star.className = 'emotion-star';
                
                // 随机位置
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // 随机延迟
                star.style.animationDelay = `${Math.random() * 3}s`;
                
                particleContainer.appendChild(star);
            }
            
            // 添加波纹效果
            for (let i = 0; i < 3; i++) {
                const ripple = document.createElement('div');
                ripple.className = 'emotion-ripple';
                
                // 设置位置在中央
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                
                // 随机大小
                const size = 20 + Math.random() * 20;
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.marginLeft = `-${size/2}px`;
                ripple.style.marginTop = `-${size/2}px`;
                
                // 随机延迟
                ripple.style.animationDelay = `${i * 1}s`;
                
                particleContainer.appendChild(ripple);
            }
            
            // 确定主要情绪类型并设置云朵背景
            let dominantType = 'calm'; // 默认
            let maxWeight = 0;
            
            for (const type in typeWeights) {
                if (typeWeights[type] > maxWeight) {
                    maxWeight = typeWeights[type];
                    dominantType = type;
                }
            }
            
            // 更新情绪云背景
            cloudContainer.className = `emotion-cloud ${dominantType}`;
            
            // 更新情绪状态指示器
            const currentEmotion = document.querySelector('.current-emotion');
            if (currentEmotion) {
                const emotionNames = {
                    calm: { en: 'Calm', zh: '平静' },
                    happy: { en: 'Happy', zh: '愉悦' },
                    anxious: { en: 'Anxious', zh: '焦虑' },
                    sad: { en: 'Sad', zh: '低落' }
                };
                
                const lang = document.getElementById('lang-toggle').textContent === 'CN' ? 'en' : 'zh';
                currentEmotion.textContent = emotionNames[dominantType][lang];
                currentEmotion.setAttribute('data-en', emotionNames[dominantType].en);
                currentEmotion.setAttribute('data-zh', emotionNames[dominantType].zh);
            }
        }
        
        function setCanvasSize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        // 设置画布尺寸
        setCanvasSize();
        
        // 窗口大小改变时重新设置画布尺寸
        window.addEventListener('resize', () => {
            setCanvasSize();
            drawEmotionCloud();
        });
        
        // 绘制情绪词云
        function drawEmotionCloud() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // 为文字创建阻挡位置图
            const blockedAreas = [];
            
            // 只保留能放下的标签
            let placedEmotions = 0;
            
            // 首先绘制重要的情绪标签
            emotions.sort((a, b) => b.weight - a.weight).forEach(emotion => {
                if (placedEmotions >= 8) return; // 最多放置8个标签
                
                const fontSize = emotion.size;
                ctx.font = `${fontSize}px 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif`;
                
                // 估计文本宽度
                const textWidth = ctx.measureText(emotion.text).width;
                const textHeight = fontSize;
                
                // 尝试20次找到不重叠的位置
                let placed = false;
                for (let attempt = 0; attempt < 20 && !placed; attempt++) {
                    // 范围缩小到中心区域
                    const padding = textWidth / 2;
                    const x = padding + Math.random() * (canvas.width - padding * 2);
                    const y = padding + Math.random() * (canvas.height - padding * 2);
                    
                    // 检查是否与已有标签重叠
                    const overlap = blockedAreas.some(area => {
                        return !(
                            x + textWidth / 2 < area.x - area.width / 2 ||
                            x - textWidth / 2 > area.x + area.width / 2 ||
                            y + textHeight / 2 < area.y - area.height / 2 ||
                            y - textHeight / 2 > area.y + area.height / 2
                        );
                    });
                    
                    if (!overlap) {
                        // 添加到阻挡区域
                        blockedAreas.push({
                            x,
                            y,
                            width: textWidth,
                            height: textHeight
                        });
                        
                        // 绘制文本
                        ctx.fillStyle = emotion.color;
                        ctx.fillText(emotion.text, x, y);
                        placed = true;
                        placedEmotions++;
                    }
                }
            });
        }
        
        // 情绪状态周期性变化
        let emotionCycleTimer;
        
        function startEmotionCycle() {
            // 清除现有定时器
            if (emotionCycleTimer) {
                clearInterval(emotionCycleTimer);
            }
            
            // 情绪状态循环变化 - 模拟真实用户的情绪波动
            const emotionStates = [
                { 
                    type: 'calm', 
                    level: { en: 'Stable', zh: '稳定' }, 
                    description: { en: 'Calm with mild fluctuations', zh: '平静，略有波动' },
                    icon: '😌'
                },
                { 
                    type: 'happy', 
                    level: { en: 'Optimistic', zh: '乐观' }, 
                    description: { en: 'Positive emotions dominate', zh: '积极情绪占主导' },
                    icon: '😊'
                },
                { 
                    type: 'anxious', 
                    level: { en: 'Slightly Anxious', zh: '轻微焦虑' }, 
                    description: { en: 'Minor stress detected', zh: '检测到轻微压力' },
                    icon: '😟'
                },
                { 
                    type: 'calm', 
                    level: { en: 'Focused', zh: '专注' }, 
                    description: { en: 'Deep concentration state', zh: '深度专注状态' },
                    icon: '🧐'
                }
            ];
            
            let currentIndex = 0;
            
            // 更新情绪状态显示
            function updateEmotionState() {
                const emotionState = emotionStates[currentIndex];
                const emotionLevel = document.querySelector('.emotion-level');
                const emotionDescription = document.querySelector('.emotion-description');
                const emotionIcon = document.querySelector('.emotion-icon');
                
                if (emotionLevel && emotionDescription && emotionIcon) {
                    const lang = document.getElementById('lang-toggle').textContent === 'CN' ? 'en' : 'zh';
                    
                    // 更新文本和属性
                    emotionLevel.textContent = emotionState.level[lang];
                    emotionLevel.setAttribute('data-en', emotionState.level.en);
                    emotionLevel.setAttribute('data-zh', emotionState.level.zh);
                    
                    emotionDescription.textContent = emotionState.description[lang];
                    emotionDescription.setAttribute('data-en', emotionState.description.en);
                    emotionDescription.setAttribute('data-zh', emotionState.description.zh);
                    
                    emotionIcon.textContent = emotionState.icon;
                    
                    // 添加变化动画
                    const emotionStatus = document.querySelector('.emotion-status');
                    if (emotionStatus) {
                        emotionStatus.classList.add('changed');
                        setTimeout(() => {
                            emotionStatus.classList.remove('changed');
                        }, 500);
                    }
                    
                    // 更新情绪类型权重
                    emotions.forEach(emotion => {
                        if (emotion.type === emotionState.type) {
                            emotion.weight = Math.min(0.9, emotion.weight + 0.2);
                        } else {
                            emotion.weight = Math.max(0.3, emotion.weight - 0.1);
                        }
                    });
                    
                    // 重建粒子和情绪云
                    createEmotionParticles();
                    drawEmotionCloud();
                    
                    // 移动到下一个状态
                    currentIndex = (currentIndex + 1) % emotionStates.length;
                }
            }
            
            // 初始更新
            updateEmotionState();
            
            // 设置定时器，每45秒改变一次情绪状态
            emotionCycleTimer = setInterval(updateEmotionState, 45000);
        }
        
        // 初始绘制
        createEmotionParticles();
        drawEmotionCloud();
        startEmotionCycle();
        
        // 添加简单动画效果 - 每10秒重新绘制一次词云
        setInterval(() => {
            drawEmotionCloud();
        }, 10000);
        
        // 情绪状态变化动画
        const emotionStatus = document.querySelector('.emotion-status');
        if (emotionStatus) {
            setInterval(() => {
                emotionStatus.classList.add('changed');
                setTimeout(() => {
                    emotionStatus.classList.remove('changed');
                }, 500);
            }, 30000); // 30秒变化一次
        }
    }
    
    // 情绪趋势图初始化 - 使用图片替代
    const timeOptions = document.querySelectorAll('.emotion_trends_card .time-option');
    if (timeOptions) {
        // 不同时间周期的图片路径
        const trendImages = {
            'day': 'assets/images/trend-chart-day.png',
            'week': 'assets/images/trend-chart-week.png',
            'month': 'assets/images/trend-chart-month.png'
        };
        
        // 设置默认图片
        const trendImg = document.getElementById('trendImg');
        if (trendImg) {
            // 添加图片加载错误处理
            trendImg.onerror = function() {
                // 如果图片加载失败，显示一个占位符背景
                this.style.backgroundColor = 'rgba(18, 28, 66, 0.3)';
                this.style.border = '1px dashed rgba(255, 255, 255, 0.3)';
                this.style.display = 'flex';
                this.style.justifyContent = 'center';
                this.style.alignItems = 'center';
                
                // 创建文本提示
                const parent = this.parentElement;
                if (!parent.querySelector('.img-placeholder-text')) {
                    const text = document.createElement('div');
                    text.className = 'img-placeholder-text';
                    text.textContent = '趋势数据可视化';
                    text.style.position = 'absolute';
                    text.style.top = '50%';
                    text.style.left = '50%';
                    text.style.transform = 'translate(-50%, -50%)';
                    text.style.color = 'rgba(255, 255, 255, 0.5)';
                    text.style.fontSize = '14px';
                    parent.appendChild(text);
                }
                
                // 防止连续触发onerror
                this.onerror = null;
                return true;
            };
        }
        
        // 默认显示周视图
        let currentPeriod = 'week';
        
        // 添加时间选择器功能
        timeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // 更新选中状态
                timeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // 获取时间周期
                currentPeriod = this.getAttribute('data-period');
                
                // 更新图片
                const trendImg = document.getElementById('trendImg');
                if (trendImg) {
                    // 设置新的图片路径
                    const newSrc = trendImages[currentPeriod] || 'assets/images/trend-chart.png';
                    if (trendImg.src !== newSrc) {
                        trendImg.src = newSrc;
                    }
                    
                    // 更新占位符文本（如果有）
                    const placeholderText = trendImg.parentElement.querySelector('.img-placeholder-text');
                    if (placeholderText) {
                        const periodText = {
                            'day': '日视图',
                            'week': '周视图',
                            'month': '月视图'
                        };
                        placeholderText.textContent = `趋势数据${periodText[currentPeriod] || ''}可视化`;
                    }
                }
            });
        });
    }
    
    // 为设置里的切换开关添加点击功能
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });
    
    // 数据同步按钮
    const syncButtons = document.querySelectorAll('.sync-button');
    syncButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('disagree-button')) {
                // 跳过上传
                const syncMessage = document.createElement('div');
                syncMessage.classList.add('sync-message');
                syncMessage.style.padding = '10px';
                syncMessage.style.marginTop = '10px';
                syncMessage.style.borderRadius = '8px';
                syncMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                syncMessage.style.textAlign = 'center';
                
                const currentLang = document.getElementById('lang-toggle').textContent === 'CN' ? 'en' : 'zh';
                syncMessage.textContent = currentLang === 'en' ? 
                    'Preferences upload skipped. You can upload later in settings.' : 
                    '已跳过偏好上传。您可以稍后在设置中上传。';
                
                // 查找父元素并添加消息
                const parent = this.closest('.data-sync');
                const existingMessage = parent.querySelector('.sync-message');
                if (existingMessage) {
                    parent.removeChild(existingMessage);
                }
                parent.appendChild(syncMessage);
            }
        });
    });
    
    // 处理文件上传
    const preferenceFile = document.getElementById('preference-file');
    if (preferenceFile) {
        preferenceFile.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const syncMessage = document.createElement('div');
                syncMessage.classList.add('sync-message');
                syncMessage.style.padding = '10px';
                syncMessage.style.marginTop = '10px';
                syncMessage.style.borderRadius = '8px';
                syncMessage.style.backgroundColor = 'rgba(74, 93, 255, 0.2)';
                syncMessage.style.textAlign = 'center';
                
                const currentLang = document.getElementById('lang-toggle').textContent === 'CN' ? 'en' : 'zh';
                
                // 读取文件
                const reader = new FileReader();
                reader.onload = function(event) {
                    try {
                        if (file.type === 'application/json') {
                            // 如果是JSON文件，尝试解析
                            JSON.parse(event.target.result);
                        }
                        
                        // 成功读取文件
                        syncMessage.textContent = currentLang === 'en' ? 
                            `File "${file.name}" uploaded successfully! Your preferences will be applied.` : 
                            `文件"${file.name}"上传成功！您的偏好设置将被应用。`;
                    } catch (error) {
                        // 解析错误
                        syncMessage.textContent = currentLang === 'en' ? 
                            'Error processing file. Please ensure it is a valid format.' : 
                            '处理文件时出错。请确保它是有效的格式。';
                        syncMessage.style.backgroundColor = 'rgba(255, 99, 71, 0.2)';
                    }
                    
                    // 添加消息到界面
                    const parent = preferenceFile.closest('.data-sync');
                    const existingMessage = parent.querySelector('.sync-message');
                    if (existingMessage) {
                        parent.removeChild(existingMessage);
                    }
                    parent.appendChild(syncMessage);
                };
                
                reader.onerror = function() {
                    syncMessage.textContent = currentLang === 'en' ? 
                        'Error reading file. Please try again.' : 
                        '读取文件时出错。请重试。';
                    syncMessage.style.backgroundColor = 'rgba(255, 99, 71, 0.2)';
                    
                    // 添加消息到界面
                    const parent = preferenceFile.closest('.data-sync');
                    const existingMessage = parent.querySelector('.sync-message');
                    if (existingMessage) {
                        parent.removeChild(existingMessage);
                    }
                    parent.appendChild(syncMessage);
                };
                
                // 根据文件类型读取
                if (file.type === 'application/json' || file.name.endsWith('.json')) {
                    reader.readAsText(file);
                } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                    reader.readAsText(file);
                } else {
                    syncMessage.textContent = currentLang === 'en' ? 
                        'Unsupported file type. Please upload a .json or .txt file.' : 
                        '不支持的文件类型。请上传.json或.txt文件。';
                    syncMessage.style.backgroundColor = 'rgba(255, 99, 71, 0.2)';
                    
                    // 添加消息到界面
                    const parent = preferenceFile.closest('.data-sync');
                    const existingMessage = parent.querySelector('.sync-message');
                    if (existingMessage) {
                        parent.removeChild(existingMessage);
                    }
                    parent.appendChild(syncMessage);
                }
            }
        });
    }
    
    // iOS设备语言切换
    const iosLangSwitcher = document.querySelector('.language-switcher');
    if (iosLangSwitcher) {
        iosLangSwitcher.addEventListener('click', () => {
            const isEnglish = iosLangSwitcher.textContent === 'EN';
            
            // 切换iOS Demo内部的文本
            document.querySelectorAll('.device-content [data-en]').forEach(el => {
                el.textContent = isEnglish ? el.getAttribute('data-zh') : el.getAttribute('data-en');
            });
            
            // 更新按钮文本
            iosLangSwitcher.textContent = isEnglish ? '中文' : 'EN';
        });
    }
    
    // 初始化情绪触发因素进度条动画
    function initEmotionTriggers() {
        const triggerBars = document.querySelectorAll('.percentage-fill');
        
        // 先将所有进度条宽度设为0
        triggerBars.forEach(bar => {
            bar.style.width = '0%';
        });
        
        // 使用Intersection Observer检测元素是否进入视图
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 当元素进入视图时，恢复其原始宽度以显示动画
                    setTimeout(() => {
                        const originalWidth = entry.target.getAttribute('data-width');
                        entry.target.style.width = originalWidth;
                    }, 300);
                    
                    // 已观察到的元素不再需要观察
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // 先存储原始宽度，然后设置为0，并开始观察
        triggerBars.forEach(bar => {
            const originalWidth = bar.style.width;
            bar.setAttribute('data-width', originalWidth);
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }
    
    // 当标签切换到趋势页时初始化触发因素进度条
    const tabToTrends = document.querySelector('.tab[data-en="Trends"]');
    if (tabToTrends) {
        tabToTrends.addEventListener('click', () => {
            // 短暂延迟确保DOM已更新
            setTimeout(initEmotionTriggers, 100);
        });
    }
    
    // 当页面加载完成后，如果当前在趋势页面，则初始化进度条
    window.addEventListener('load', () => {
        const activeContent = document.querySelector('.content.active');
        if (activeContent && activeContent.querySelector('.emotion-triggers-card')) {
            initEmotionTriggers();
        }
    });
    
    // 添加随机星星闪烁效果
    function addTwinkleEffect() {
        const iosDemo = document.getElementById('ios-demo');
        if (!iosDemo) return;
        
        const numberOfStars = 50;
        
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // 随机位置
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // 随机大小
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // 随机闪烁延迟和持续时间
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
            
            // 样式
            star.style.position = 'absolute';
            star.style.borderRadius = '50%';
            star.style.backgroundColor = 'white';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            star.style.zIndex = '1';
            
            iosDemo.appendChild(star);
        }
    }
    
    addTwinkleEffect();
});

// 语音交互功能
const voiceInteraction = document.getElementById('voiceInteraction');
const voiceActive = document.getElementById('voiceActive');
const closeVoice = document.querySelector('.close-voice');
const voiceWave = document.querySelector('.voice-wave');
const voiceText = document.querySelector('.voice-text');

// 欢迎模态框
const welcomeModal = document.getElementById('welcomeModal');
const closeModal = document.querySelector('.close-modal');
const modalButton = document.querySelector('.modal-button');

// 语音交互按钮点击事件
voiceInteraction.addEventListener('click', () => {
    voiceActive.classList.toggle('show');
    if (voiceActive.classList.contains('show')) {
        startVoiceRecognition();
    } else {
        stopVoiceRecognition();
    }
});

// 关闭语音面板
closeVoice.addEventListener('click', () => {
    voiceActive.classList.remove('show');
    stopVoiceRecognition();
});

// 语音识别功能
let recognition;
function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onstart = () => {
            voiceWave.style.background = 'url("../assets/images/voice-wave.gif") center/contain no-repeat';
            voiceText.textContent = '正在聆听...';
        };
        
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            
            voiceText.textContent = transcript;
        };
        
        recognition.onerror = (event) => {
            console.error('语音识别错误:', event.error);
            voiceText.textContent = '发生错误，请重试';
        };
        
        recognition.onend = () => {
            voiceWave.style.background = 'none';
            voiceText.textContent = '点击麦克风开始说话';
        };
        
        recognition.start();
    } else {
        voiceText.textContent = '您的浏览器不支持语音识别';
    }
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
    }
}

// 欢迎模态框功能
function showWelcomeModal() {
    welcomeModal.classList.add('show');
}

function hideWelcomeModal() {
    welcomeModal.classList.remove('show');
}

// 关闭模态框
closeModal.addEventListener('click', (e) => {
    e.stopPropagation();
    hideWelcomeModal();
});

modalButton.addEventListener('click', (e) => {
    e.stopPropagation();
    hideWelcomeModal();
});

// 点击模态框外部关闭
welcomeModal.addEventListener('click', (e) => {
    if (e.target === welcomeModal) {
        hideWelcomeModal();
    }
});