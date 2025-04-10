# LumineaOS - 创始人故事模块

这是LumineaOS官方网站中"创始人故事"模块的技术说明文档。该模块展示了创始人Thea Chen的个人经历和愿景，采用中英文双语展示。

## 模块功能

- **内容**: 展示创始人的个人故事，包括遭遇、感悟和对产品的愿景
- **设计**: 采用星空背景和手写风格字体，创造温暖、治愈的氛围
- **交互**: 页面滚动时，文本元素以顺序动画形式呈现，增强沉浸感
- **双语**: 支持中英文内容切换，与网站整体语言切换功能集成

## 技术实现

### 使用的技术栈

- **HTML5**: 语义化标记创始人故事内容
- **CSS3**: 
  - `Dancing Script` 字体实现手写风格
  - CSS动画实现文字渐入和星空效果
  - Flexbox布局保证响应式设计
- **JavaScript**: 与网站现有的语言切换功能集成

### 主要组件

1. **星空背景**: 使用CSS渐变和动画创建简约星空效果
   ```css
   .starry-bg {
     background-image: radial-gradient(...);
     animation: twinkle 4s infinite alternate;
   }
   ```

2. **手写字体**: 引入Google Font - Dancing Script
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
   
   .handwritten {
     font-family: 'Dancing Script', cursive;
   }
   ```

3. **动画效果**: 使用CSS动画使内容按序渐入
   ```css
   .story-paragraph {
     opacity: 0;
     transform: translateY(20px);
     animation: fade-in 1s forwards;
     animation-delay: 0.2s;
   }
   ```

4. **引用样式**: 特殊设计的引用块样式
   ```css
   .founder-quote, .founder-note {
     position: relative;
     padding: 20px 30px;
     background: rgba(255, 255, 255, 0.05);
   }
   ```

## 维护指南

### 更新内容

1. 在`index.html`中找到创始人故事模块(`<div class="card founder-story">`)
2. 更新中英文内容时，同时更新`data-en`和`data-zh`属性
   ```html
   <p data-en="English content" data-zh="中文内容">Default display content</p>
   ```

### 调整样式

1. CSS样式位于`css/styles.css`文件中的"创始人故事模块样式"部分
2. 针对不同屏幕尺寸的响应式调整在媒体查询部分:
   ```css
   @media (max-width: 480px) {
     /* 创始人故事响应式调整 */
     .founder-story .story-section {
       padding: 15px;
     }
     ...
   }
   ```

### 测试

在更新内容或样式后，请确保测试以下功能:
1. 语言切换功能是否正常
2. 在不同设备上的响应式布局
3. 动画效果是否正常显示
4. 星空背景在不同浏览器中的一致性

## 设计理念

创始人故事模块采用星空背景和手写风格，旨在:
1. 营造温暖、个人化的讲述氛围
2. 通过动画吸引用户注意，增强内容的沉浸感
3. 风格化但不脱离网站整体设计语言
4. 通过文字渐变色与网站主题色保持一致性

## 版权信息

© 2025 LogicNova Solution. 保留所有权利。
开发者: Thea Chen 