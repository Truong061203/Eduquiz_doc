import { QUESTIONS } from './questions.js';
import JSZip from 'jszip';

// ==========================================================================
// Dictionary of common HCI terms and explanations to help user memorize answers
// ==========================================================================
const HCI_EXPLANATION_DICTIONARY = [
  {
    keys: ['ucd', 'user-centered', 'người dùng làm trung tâm', 'lấy người dùng'],
    title: 'Quy trình UCD (User-Centered Design)',
    desc: 'Thiết kế lấy người dùng làm trung tâm yêu cầu đưa người dùng thực tế tham gia vào tất cả các giai đoạn (khảo sát, thiết kế mẫu thử, thử nghiệm liên tục) để đảm bảo sản phẩm đáp ứng chính xác nhu cầu của họ.'
  },
  {
    keys: ['fitts', 'định luật fitts'],
    title: 'Định luật Fitts (Fitts\' Law)',
    desc: 'Thời gian di chuyển đến một mục tiêu phụ thuộc vào <strong>Khoảng cách</strong> đến mục tiêu và <strong>Kích thước</strong> của nó. Mục tiêu càng to và càng gần thì càng dễ bấm (giúp tối ưu vị trí nút).'
  },
  {
    keys: ['heuristic', 'đánh giá heuristic', 'nielsen', '10 nguyên lý'],
    title: 'Đánh giá Heuristic (Heuristic Evaluation)',
    desc: 'Phương pháp đánh giá tính khả dụng do <strong>chuyên gia</strong> thực hiện bằng cách đối chiếu giao diện với 10 nguyên lý thiết kế của Jakob Nielsen (nhất quán, phòng tránh lỗi, phản hồi trạng thái...).'
  },
  {
    keys: ['persona', 'nhân vật đại diện', 'nhân vật tưởng tượng'],
    title: 'Persona (Nhân vật đại diện)',
    desc: 'Hồ sơ hư cấu nhưng đại diện cho một nhóm người dùng mục tiêu cụ thể, được xây dựng từ nghiên cứu thực tế để giúp định hướng thiết kế phù hợp với đúng đối tượng.'
  },
  {
    keys: ['goms', 'klm', 'keystroke-level', 'selection rules'],
    title: 'Mô hình GOMS / KLM',
    desc: 'Các mô hình dự đoán hiệu năng (Predictive Models) dùng để ước lượng thời gian thực hiện tác vụ của người dùng có kinh nghiệm mà không cần tiến hành kiểm thử thực tế.'
  },
  {
    keys: ['usability', 'tính khả dụng', 'khả dụng'],
    title: 'Tính khả dụng (Usability)',
    desc: 'Được định nghĩa bởi mức độ dễ sử dụng và hiệu quả của hệ thống. Gồm 5 thuộc tính: <strong>Dễ học, Dễ nhớ, Hiệu quả, Ít lỗi, và Sự thỏa mãn</strong> của người dùng.'
  },
  {
    keys: ['mental model', 'mô hình tâm trí', 'mô hình nhận thức'],
    title: 'Mô hình tâm trí (Mental Model)',
    desc: 'Cách người dùng hình dung về cơ chế hoạt động của phần mềm dựa trên kiến thức và trải nghiệm có sẵn của họ. Giao diện nên phù hợp với mô hình tâm trí này.'
  },
  {
    keys: ['nhất quán', 'consistency'],
    title: 'Nguyên lý Nhất quán (Consistency)',
    desc: 'Đảm bảo các biểu tượng, màu sắc, vị trí nút bấm và thuật ngữ giống nhau trong toàn bộ hệ thống để người dùng không phải học lại cách dùng ở các màn hình khác nhau.'
  },
  {
    keys: ['phản hồi', 'feedback'],
    title: 'Nguyên lý Phản hồi (Feedback)',
    desc: 'Hệ thống luôn phải phản hồi rõ ràng và kịp thời cho người dùng biết trạng thái hiện tại (ví dụ: đổi màu nút khi bấm, hiện vòng xoay tải dữ liệu) để họ biết hành động đã thành công.'
  },
  {
    keys: ['lỗi', 'error', 'phòng ngừa lỗi'],
    title: 'Phòng ngừa và xử lý lỗi',
    desc: 'Thiết kế tốt ưu tiên <strong>ngăn ngừa lỗi xảy ra</strong> trước khi người dùng thực hiện (như tắt nút gửi khi form chưa hợp lệ), và nếu có lỗi thì báo bằng ngôn ngữ dễ hiểu kèm hướng dẫn khắc phục.'
  },
  {
    keys: ['trẻ em', 'kids', 'học sinh tiểu học'],
    title: 'Thiết kế cho Trẻ em',
    desc: 'Cần sử dụng màu sắc tươi sáng, giao diện đơn giản trực quan, ít chữ viết phức tạp, ứng dụng các yếu tố trò chơi hóa (gamification) và hỗ trợ phản hồi bằng âm thanh sinh động.'
  },
  {
    keys: ['người cao tuổi', 'người già', 'lớn tuổi'],
    title: 'Thiết kế cho Người cao tuổi',
    desc: 'Cần tăng kích thước chữ (font-size lớn), tăng độ tương phản màu sắc, thiết kế các phím bấm to dễ nhấn, đơn giản hóa menu điều hướng và tránh các yêu cầu thao tác phức tạp hay quá nhanh.'
  },
  {
    keys: ['khuyết tật', 'tiếp cận', 'accessibility', 'screen reader'],
    title: 'Khả năng Tiếp cận (Accessibility)',
    desc: 'Đảm bảo mọi người (kể cả người khuyết tật thị giác, thính giác) đều dùng được phần mềm. Các giải pháp: hỗ trợ đọc màn hình, phím tắt thay chuột, phụ đề video, độ tương phản cao.'
  },
  {
    keys: ['mẫu thử', 'prototype', 'lo-fi', 'hi-fi'],
    title: 'Thiết kế Mẫu thử (Prototype)',
    desc: 'Tạo ra mô hình mô phỏng giao diện (từ vẽ giấy thô sơ Lo-fi đến tương tác động Hi-fi) để kiểm tra tính khả dụng và lấy phản hồi sớm từ người dùng trước khi tiến hành code thực tế.'
  },
  {
    keys: ['storyboard', 'kịch bản hình ảnh'],
    title: 'Storyboard (Kịch bản hình ảnh)',
    desc: 'Chuỗi hình ảnh minh họa cách thức người dùng tương tác với hệ thống trong đời thực, giúp nhóm phát triển hiểu rõ ngữ cảnh sử dụng sản phẩm.'
  },
  {
    keys: ['nhiệm vụ', 'task analysis', 'phân tích tác vụ'],
    title: 'Phân tích Tác vụ (Task Analysis)',
    desc: 'Tìm hiểu và chia nhỏ các bước thực hiện công việc của người dùng để từ đó thiết kế các luồng giao diện (workflow) tối ưu nhất cho họ.'
  }
];

function extractQuestionKeyword(title) {
  let kw = title;
  
  // Remove question mark
  kw = kw.replace(/\?+$/, '');
  
  // Clean common suffixes (Vietnamese question wordings)
  const suffixes = [
    /lĩnh vực nào sau đây$/, /nào sau đây$/, /đâu sau đây$/,
    /sau đây$/, /là gì$/, /nhất$/, /dưới đây$/,
    /như thế nào$/, /được hiểu là gì$/, /bao gồm những gì$/,
    /nào dưới đây$/, /là như thế nào$/, /là công cụ gì$/,
    /dùng để làm gì$/, /là để làm gì$/, /có vai trò gì$/,
    /có tác dụng gì$/, /có ý nghĩa gì$/, /được dùng để làm gì$/,
    /được sử dụng để làm gì$/
  ];
  suffixes.forEach(pat => {
    kw = kw.replace(pat, '');
  });
  
  // Clean common prefixes
  const prefixes = [
    /^[Đđ]âu là\s+/, /^[Đđ]âu không phải là\s+/, /^[Đđ]âu không phải\s+/,
    /^[Tt]rong quy trình\s+/, /^[Tt]rong thiết kế\s+/, /^[Tt]rong phương pháp\s+/,
    /^[Tt]heo nguyên tắc\s+/, /^[Tt]heo phương pháp\s+/, /^[Tt]heo quy trình\s+/,
    /^[Yy]ếu tố nào\s+/, /^[Pp]hương pháp nào\s+/, /^[Nn]guyên lý nào\s+/,
    /^[Bb]ước nào\s+/, /^[Đđ]ặc điểm nào\s+/, /^[L]ợi ích nào\s+/,
    /^[Cc]ách tốt nhất để\s+/, /^[Mm]ục tiêu của việc\s+/, /^[Mm]ột trong những\s+/
  ];
  prefixes.forEach(pat => {
    kw = kw.replace(pat, '');
  });
  
  kw = kw.trim();
  
  // Capitalize first letter
  if (kw.length > 0) {
    kw = kw.charAt(0).toUpperCase() + kw.slice(1);
  }
  
  // Remove trailing colon or space
  kw = kw.replace(/:\s*$/, '').trim();
  
  // If it's too long, truncate it to keep it as a crisp keyword
  const words = kw.split(/\s+/);
  if (words.length > 8) {
    kw = words.slice(0, 7).join(' ') + '...';
  }
  
  return kw;
}

function getQuestionExplanation(q) {
  const qTextLower = (q.header + ' ' + q.title).toLowerCase();
  
  // Find correct option
  const correctOpt = q.options.find(o => o.is_correct);
  const correctText = correctOpt ? correctOpt.text : '';
  const correctTextLower = correctText.toLowerCase();
  
  // Extract key concept mapping
  const questionKeyword = extractQuestionKeyword(q.title);
  
  // Search for matching keyword in dictionary
  let matchedTerm = null;
  for (const item of HCI_EXPLANATION_DICTIONARY) {
    const hasMatch = item.keys.some(key => qTextLower.includes(key) || correctTextLower.includes(key));
    if (hasMatch) {
      matchedTerm = item;
      break;
    }
  }
  
  let explanationHtml = '';
  
  // 1. High contrast Keyword Memory Card (Mental link card)
  explanationHtml += `
    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 14px;">
      <span style="color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; display: block; margin-bottom: 6px;">🧠 LIÊN TƯỞNG TỪ KHÓA ÔN THI NHANH</span>
      <div style="font-size: 14.5px; font-weight: 700; display: flex; flex-direction: column; gap: 6px;">
        <div style="color: var(--color-primary);"><span style="color: var(--text-muted); font-weight: 500;">Từ khóa câu hỏi:</span> "${questionKeyword}"</div>
        <div style="color: var(--color-success);"><span style="color: var(--text-muted); font-weight: 500;">➔ Đáp án bôi đỏ:</span> "${correctText}"</div>
      </div>
    </div>
  `;
  
  // 2. Definition details
  if (matchedTerm) {
    explanationHtml += `<p style="margin-bottom: 6px;">💡 <strong>Chủ đề học thuật: ${matchedTerm.title}</strong></p>`;
    explanationHtml += `<p style="color: var(--text-secondary); font-size: 13px;">${matchedTerm.desc}</p>`;
  } else {
    explanationHtml += `<p style="margin-bottom: 6px;">💡 <strong>Gợi ý ôn thi:</strong></p>`;
    explanationHtml += `<p style="color: var(--text-secondary); font-size: 13px;">Nhớ cặp từ khóa trên để chọn nhanh đáp án chính xác khi làm bài thi trắc nghiệm HCI.</p>`;
  }
  
  return explanationHtml;
}

function getQuestionKey(q) {
  return `${q.chapter}_${q.header}`;
}

// ==========================================================================
// Application State
// ==========================================================================
const state = {
  // Available questions
  questions: QUESTIONS,
  
  // Filtering & active question set
  activeQuestions: [], // Questions currently being practiced/tested
  currentQuestionIndex: 0,
  
  // App mode: 'dashboard' | 'study' | 'exam' | 'results'
  currentView: 'dashboard',
  quizMode: 'study', // 'study' (instant feedback) | 'exam' (submit later)
  activeSource: null, // 'chapter-1', 'exam', 'bookmarks', 'incorrects', 'marathon'
  activeSourceName: '', // Human readable title
  
  // Exam timer
  examTimeLimitSeconds: 40 * 60, // 40 minutes
  examTimerInterval: null,
  examSecondsRemaining: 0,
  
  // User history saved in localStorage
  userHistory: {
    answers: {},       // { 'Câu 1': { selectedIndex: 0, isCorrect: true } }
    bookmarks: [],     // [ 'Câu 1', 'Câu 5' ]
    examsTakenCount: 0 // Number of mock exams taken
  }
};

// ==========================================================================
// Local Storage Management
// ==========================================================================
const STORAGE_KEY = 'hci_eduquiz_progress_v1';
const CUSTOM_QUESTIONS_KEY = 'hci_eduquiz_custom_questions_v1';

function loadProgress() {
  // Load custom questions if they exist
  const customQuestions = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
  if (customQuestions) {
    try {
      state.questions = JSON.parse(customQuestions);
      // Show restore button
      document.getElementById('btn-restore-default').classList.remove('hide');
    } catch (e) {
      console.error('Error parsing custom questions', e);
      state.questions = QUESTIONS;
    }
  } else {
    state.questions = QUESTIONS;
    document.getElementById('btn-restore-default').classList.add('hide');
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      state.userHistory = JSON.parse(data);
      // Ensure arrays/objects exist
      if (!state.userHistory.answers) state.userHistory.answers = {};
      if (!state.userHistory.bookmarks) state.userHistory.bookmarks = [];
      if (state.userHistory.examsTakenCount === undefined) state.userHistory.examsTakenCount = 0;
      
      // Migrate old non-unique keys to new unique format (${chapter}_${header})
      let migrated = false;
      const oldAnswers = state.userHistory.answers;
      const newAnswers = {};
      
      for (const oldKey in oldAnswers) {
        if (!oldKey.includes('_')) {
          const matchedQ = state.questions.find(q => q.header === oldKey);
          if (matchedQ) {
            newAnswers[`${matchedQ.chapter}_${matchedQ.header}`] = oldAnswers[oldKey];
            migrated = true;
          } else {
            newAnswers[oldKey] = oldAnswers[oldKey];
          }
        } else {
          newAnswers[oldKey] = oldAnswers[oldKey];
        }
      }
      state.userHistory.answers = newAnswers;
      
      const oldBookmarks = state.userHistory.bookmarks;
      const newBookmarks = [];
      oldBookmarks.forEach(oldKey => {
        if (typeof oldKey === 'string' && !oldKey.includes('_')) {
          const matchedQ = state.questions.find(q => q.header === oldKey);
          if (matchedQ) {
            newBookmarks.push(`${matchedQ.chapter}_${matchedQ.header}`);
            migrated = true;
          } else {
            newBookmarks.push(oldKey);
          }
        } else {
          newBookmarks.push(oldKey);
        }
      });
      state.userHistory.bookmarks = newBookmarks;
      
      if (migrated) {
        // Save the migrated history
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userHistory));
      }
    } catch (e) {
      console.error('Error parsing stored progress', e);
    }
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userHistory));
  updateDashboardStats();
}

function resetAllProgress() {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến độ học tập và các câu hỏi đã đánh dấu không? Hành động này không thể khôi phục.')) {
    state.userHistory = {
      answers: {},
      bookmarks: [],
      examsTakenCount: 0
    };
    saveProgress();
    renderChapterList();
    alert('Đã xóa sạch tiến độ học tập.');
  }
}

function restoreDefaultQuestions() {
  if (confirm('Bạn có chắc chắn muốn khôi phục lại bộ câu hỏi gốc (690 câu) của chương trình? Bộ câu hỏi tự nạp sẽ bị xóa khỏi bộ nhớ.')) {
    localStorage.removeItem(CUSTOM_QUESTIONS_KEY);
    state.questions = QUESTIONS;
    document.getElementById('btn-restore-default').classList.add('hide');
    
    // Clear progress to prevent key mismatch
    state.userHistory = {
      answers: {},
      bookmarks: [],
      examsTakenCount: 0
    };
    saveProgress();
    renderChapterList();
    updateDashboardStats();
    alert('Đã khôi phục bộ đề gốc thành công.');
  }
}

// ==========================================================================
// Client-side DOCX Parser & Uploader
// ==========================================================================
async function parseAndLoadDocxFiles(files) {
  if (files.length === 0) return;
  
  const loadingOverlay = showLoading('Đang xử lý các file .docx...');
  const allParsedQuestions = [];
  
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updateLoadingText(loadingOverlay, `Đang đọc file (${i + 1}/${files.length}): ${file.name}`);
      
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      const docXmlFile = zip.file("word/document.xml");
      if (!docXmlFile) {
        throw new Error(`Không tìm thấy cấu trúc word/document.xml trong file ${file.name}`);
      }
      
      const xmlText = await docXmlFile.async("text");
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      
      // Extract chapter number from filename
      let chapterNum = i + 1; // Default sequential
      const chapterMatch = file.name.match(/(?:Chương|Chuong|C)\s*(\d+)/i);
      if (chapterMatch) {
        chapterNum = parseInt(chapterMatch[1]);
      }
      
      const chapterName = `Chương ${chapterNum}: ${file.name.replace(/\.[^/.]+$/, "")}`;
      
      // Parse characters with colors
      const chars = [];
      const paragraphs = xmlDoc.getElementsByTagNameNS("*", "p");
      
      for (let p of paragraphs) {
        const runs = p.getElementsByTagNameNS("*", "r");
        for (let r of runs) {
          const texts = r.getElementsByTagNameNS("*", "t");
          let tStr = "";
          for (let t of texts) {
            tStr += t.textContent;
          }
          if (!tStr) continue;
          
          let isRed = false;
          const rPrs = r.getElementsByTagNameNS("*", "rPr");
          if (rPrs.length > 0) {
            const colors = rPrs[0].getElementsByTagNameNS("*", "color");
            if (colors.length > 0) {
              const colorVal = colors[0].getAttribute("w:val");
              if (colorVal === "FF0000") {
                isRed = true;
              }
            }
          }
          
          for (let c of tStr) {
            chars.push({ char: c, is_red: isRed });
          }
        }
        chars.push({ char: "\n", is_red: false });
      }
      
      // Extract questions from chars
      const textStr = chars.map(c => c.char).join('');
      const qMatches = [...textStr.matchAll(/Câu\s+\d+/g)];
      
      for (let qIdx = 0; qIdx < qMatches.length; qIdx++) {
        const startIdx = qMatches[qIdx].index;
        const endIdx = qIdx + 1 < qMatches.length ? qMatches[qIdx+1].index : chars.length;
        
        const qChars = chars.slice(startIdx, endIdx);
        const qText = textStr.slice(startIdx, endIdx);
        
        // Find options separated by [<$>]
        const optMatches = [...qText.matchAll(/\[<\$>\]/g)];
        if (optMatches.length === 0) continue;
        
        const firstOptStart = optMatches[0].index;
        const qHeaderAndTitle = qText.slice(0, firstOptStart).trim();
        
        let qHeader = "";
        let qTitle = "";
        const headerMatch = qHeaderAndTitle.match(/^(Câu\s+\d+(?:\s*\[[^\]]+\])*\s*:?)/);
        if (headerMatch) {
          qHeader = headerMatch[1].trim();
          qTitle = qHeaderAndTitle.slice(qHeader.length).trim();
        } else {
          qHeader = qHeaderAndTitle.split('\n')[0].trim();
          qTitle = qHeaderAndTitle.slice(qHeader.length).trim();
        }
        
        qTitle = qTitle.replace(/^:\s*/, '').trim();
        
        const options = [];
        for (let oIdx = 0; oIdx < optMatches.length; oIdx++) {
          const oStart = optMatches[oIdx].index;
          const oEnd = oIdx + 1 < optMatches.length ? optMatches[oIdx+1].index : qChars.length;
          
          // Check if separator itself is red
          const sepChars = qChars.slice(oStart, oStart + 5);
          const isSepRed = sepChars.some(c => c.is_red);
          
          // Option text
          const optTextChars = qChars.slice(oStart + 5, oEnd);
          const optText = optTextChars.map(c => c.char).join('').trim();
          
          // Check if option text has red color
          const nonSpaceChars = optTextChars.filter(c => c.char.trim());
          let isTextRed = false;
          if (nonSpaceChars.length > 0) {
            const firstFewRed = nonSpaceChars.slice(0, 3).every(c => c.is_red);
            const majorityRed = nonSpaceChars.filter(c => c.is_red).length / nonSpaceChars.length > 0.5;
            isTextRed = firstFewRed || majorityRed;
          }
          
          const isCorrect = isSepRed || isTextRed;
          
          if (optText) {
            options.push({
              text: optText,
              is_correct: isCorrect
            });
          }
        }
        
        let difficulty = "Dễ";
        if (qHeader.includes("[TB]")) difficulty = "Trung bình";
        else if (qHeader.includes("[KH]")) difficulty = "Khó";
        
        // Ensure exactly 1 correct option
        const correctCount = options.filter(o => o.is_correct).length;
        if (correctCount === 0 && options.length > 0) {
          options[0].is_correct = true;
        } else if (correctCount > 1) {
          let found = false;
          options.forEach(o => {
            if (o.is_correct) {
              if (found) o.is_correct = false;
              else found = true;
            }
          });
        }
        
        if (options.length > 0) {
          allParsedQuestions.push({
            chapter: chapterNum,
            chapter_name: chapterName,
            header: qHeader,
            title: qTitle,
            difficulty: difficulty,
            options: options
          });
        }
      }
    }
    
    if (allParsedQuestions.length === 0) {
      throw new Error("Không trích xuất được câu hỏi nào từ các file đã chọn. Hãy kiểm tra lại định dạng file.");
    }
    
    // Sort
    allParsedQuestions.sort((a, b) => {
      if (a.chapter !== b.chapter) return a.chapter - b.chapter;
      const numA = parseInt(a.header.match(/\d+/) || 0);
      const numB = parseInt(b.header.match(/\d+/) || 0);
      return numA - numB;
    });
    
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(allParsedQuestions));
    state.questions = allParsedQuestions;
    
    // Reset progress
    state.userHistory = {
      answers: {},
      bookmarks: [],
      examsTakenCount: 0
    };
    saveProgress();
    
    hideLoading(loadingOverlay);
    alert(`Nạp đề thành công! Đã trích xuất ${allParsedQuestions.length} câu hỏi.`);
    
    // Refresh UI
    document.getElementById('btn-restore-default').classList.remove('hide');
    renderChapterList();
    updateDashboardStats();
    
  } catch (error) {
    hideLoading(loadingOverlay);
    alert(`Lỗi khi nạp file: ${error.message}`);
    console.error(error);
  }
}

function showLoading(msg) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(11, 15, 25, 0.9)';
  overlay.style.backdropFilter = 'blur(10px)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = '#fff';
  
  overlay.innerHTML = `
    <div style="border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid var(--color-primary); border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
    <div id="loading-text" style="font-size: 16px; font-weight: 600; font-family: var(--font-display);">${msg}</div>
    <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function updateLoadingText(overlay, msg) {
  const textElem = overlay.querySelector('#loading-text');
  if (textElem) textElem.textContent = msg;
}

function hideLoading(overlay) {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
}

// ==========================================================================
// Theme Management
// ==========================================================================
function updateThemeIcons(isLight) {
  const sunIcon = document.querySelector('.theme-icon-sun');
  const moonIcon = document.querySelector('.theme-icon-moon');
  if (sunIcon && moonIcon) {
    if (isLight) {
      sunIcon.classList.add('hide');
      moonIcon.classList.remove('hide');
    } else {
      sunIcon.classList.remove('hide');
      moonIcon.classList.add('hide');
    }
  }
}

function initTheme() {
  const isLight = localStorage.getItem('theme_light') === 'true';
  const body = document.body;
  
  if (isLight) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
  // Wait a small tick to ensure elements are parsed if called early
  setTimeout(() => updateThemeIcons(isLight), 0);
}

function toggleTheme() {
  const body = document.body;
  const isCurrentlyDark = body.classList.contains('dark-theme');
  
  if (isCurrentlyDark) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme_light', 'true');
    updateThemeIcons(true);
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme_light', 'false');
    updateThemeIcons(false);
  }
}

// ==========================================================================
// Dashboard Stats Calculations
// ==========================================================================
function updateDashboardStats() {
  const totalQuestions = state.questions.length;
  
  // Set total question counts dynamically
  const headerTotal = document.getElementById('header-total-count');
  if (headerTotal) headerTotal.textContent = totalQuestions;
  const heroTotal = document.getElementById('hero-total-count');
  if (heroTotal) heroTotal.textContent = totalQuestions;

  // Total bookmarks
  const bookmarksCount = state.userHistory.bookmarks.length;
  document.getElementById('stat-bookmarks-all').textContent = bookmarksCount;
  
  // Bookmark button
  const btnBookmarks = document.getElementById('btn-start-bookmarks');
  const countBookmarksSpan = document.getElementById('bookmark-count-btn');
  countBookmarksSpan.textContent = bookmarksCount;
  btnBookmarks.disabled = bookmarksCount === 0;

  // Answers count
  const answersList = Object.values(state.userHistory.answers);
  const correctCount = answersList.filter(a => a.isCorrect).length;
  document.getElementById('stat-correct-all').textContent = correctCount;
  
  // Overall progress percentage
  const answeredCount = answersList.length;
  const pct = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  
  document.getElementById('overall-percentage').textContent = `${pct}% (${answeredCount}/${totalQuestions} câu)`;
  document.getElementById('overall-progress-bar').style.width = `${pct}%`;
  
  // Exams taken count
  document.getElementById('stat-exams-taken').textContent = state.userHistory.examsTakenCount;

  // Incorrect questions practice button
  const incorrectCount = answersList.filter(a => !a.isCorrect).length;
  const btnIncorrects = document.getElementById('btn-start-incorrects');
  const countIncorrectsSpan = document.getElementById('incorrect-count-btn');
  countIncorrectsSpan.textContent = incorrectCount;
  btnIncorrects.disabled = incorrectCount === 0;
}

// ==========================================================================
// Render Chapter List Cards
// ==========================================================================
function getChaptersMeta() {
  const meta = [];
  const chapters = [...new Set(state.questions.map(q => q.chapter))].sort((a, b) => a - b);
  
  chapters.forEach(chId => {
    const chQuestions = state.questions.filter(q => q.chapter === chId);
    const firstQ = chQuestions[0];
    const chName = firstQ ? firstQ.chapter_name : `Chương ${chId}`;
    meta.push({
      id: chId,
      name: chName,
      total: chQuestions.length
    });
  });
  
  return meta.length > 0 ? meta : [
    { id: 1, name: 'Chương 1: Tổng quan về HCI', total: 60 },
    { id: 2, name: 'Chương 2: Các khía cạnh thiết kế', total: 180 },
    { id: 3, name: 'Chương 3: Tính khả dụng & UCD', total: 200 },
    { id: 4, name: 'Chương 4: Đánh giá & Thiết kế nâng cao', total: 250 }
  ];
}

function renderChapterList() {
  const container = document.getElementById('chapter-list');
  container.innerHTML = '';
  
  getChaptersMeta().forEach(ch => {
    // Calculate statistics for this specific chapter
    const chQuestions = state.questions.filter(q => q.chapter === ch.id);
    
    // Find how many of these are in history
    let answeredInCh = 0;
    let correctInCh = 0;
    
    chQuestions.forEach(q => {
      const record = state.userHistory.answers[getQuestionKey(q)];
      if (record) {
        answeredInCh++;
        if (record.isCorrect) {
          correctInCh++;
        }
      }
    });
    
    const pct = Math.round((answeredInCh / ch.total) * 100);
    
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.addEventListener('click', () => startPractice('chapter', ch.id));
    
    card.innerHTML = `
      <div class="chapter-info">
        <div class="chapter-header">
          <h4>${ch.name}</h4>
          <span class="badge badge-accent">${ch.total} câu</span>
        </div>
        <div class="chapter-stats">Đã làm: ${answeredInCh}/${ch.total} câu (Đúng: ${correctInCh} câu)</div>
        <div class="chapter-progress">
          <div class="chapter-progress-bar-bg">
            <div class="chapter-progress-bar" style="width: ${pct}%"></div>
          </div>
          <span class="chapter-percent">${pct}%</span>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
        <button class="btn btn-secondary btn-sm btn-start-practice">
          Luyện tập <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-left:4px;"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </button>
        ${answeredInCh > 0 ? `
          <button class="btn btn-secondary btn-sm btn-reset-chapter" title="Làm lại chương này">
            Làm lại chương
          </button>
        ` : ''}
      </div>
    `;
    
    const resetBtn = card.querySelector('.btn-reset-chapter');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn click lan tới card làm bắt đầu luyện tập
        if (confirm(`Bạn có chắc chắn muốn làm lại toàn bộ câu hỏi trong "${ch.name}" không?`)) {
          chQuestions.forEach(q => {
            delete state.userHistory.answers[getQuestionKey(q)];
          });
          saveProgress();
          renderChapterList();
        }
      });
    }
    
    container.appendChild(card);
  });
}

// ==========================================================================
// Start Quiz Functions
// ==========================================================================
function startPractice(type, key) {
  state.quizMode = 'study';
  document.getElementById('exam-timer-wrapper').classList.add('hide');
  document.getElementById('btn-submit-exam').classList.add('hide');
  
  if (type === 'chapter') {
    state.activeQuestions = state.questions.filter(q => q.chapter === key);
    const chMeta = getChaptersMeta().find(c => c.id === key);
    state.activeSourceName = chMeta ? chMeta.name : `Chương ${key}`;
    state.activeSource = `chapter-${key}`;
  } else if (type === 'marathon') {
    state.activeQuestions = [...state.questions];
    state.activeSourceName = 'Marathon 690 Câu';
    state.activeSource = 'marathon';
  } else if (type === 'bookmarks') {
    state.activeQuestions = state.questions.filter(q => state.userHistory.bookmarks.includes(getQuestionKey(q)));
    state.activeSourceName = 'Câu hỏi đã đánh dấu';
    state.activeSource = 'bookmarks';
  } else if (type === 'incorrects') {
    // Collect all incorrect questions based on current userHistory
    const incorrectKeys = Object.keys(state.userHistory.answers).filter(key => !state.userHistory.answers[key].isCorrect);
    state.activeQuestions = state.questions.filter(q => incorrectKeys.includes(getQuestionKey(q)));
    state.activeSourceName = 'Câu làm sai gần đây';
    state.activeSource = 'incorrects';
  }
  
  state.currentQuestionIndex = 0;
  switchView('quiz');
  initQuizUI();
}

function startExam() {
  state.quizMode = 'exam';
  state.activeSource = 'exam';
  state.activeSourceName = 'Đề thi thử tổng hợp';
  
  // Randomly select 40 questions from all 690 questions
  const shuffled = [...state.questions].sort(() => 0.5 - Math.random());
  state.activeQuestions = shuffled.slice(0, 40);
  
  // Reset answers for the current exam session in active questions
  state.activeQuestions.forEach(q => {
    // Clean up temporary exam answer property
    delete q.examUserSelectedIndex;
  });
  
  state.currentQuestionIndex = 0;
  switchView('quiz');
  
  // Setup timer
  document.getElementById('exam-timer-wrapper').classList.remove('hide');
  document.getElementById('btn-submit-exam').classList.remove('hide');
  startExamTimer();
  
  initQuizUI();
}

// ==========================================================================
// Quiz Interface Rendering & Navigation
// ==========================================================================
function switchView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  
  if (viewName === 'dashboard') {
    stopExamTimer();
    updateDashboardStats();
    renderChapterList();
  }
}

function initQuizUI() {
  document.getElementById('quiz-mode-display').textContent = state.activeSourceName;
  document.getElementById('total-q-count-display').textContent = state.activeQuestions.length;
  
  renderQuestion();
  renderQuestionGrid();
}

function renderQuestion() {
  if (state.activeQuestions.length === 0) {
    document.getElementById('question-text').textContent = 'Không có câu hỏi nào trong danh mục này.';
    document.getElementById('options-container').innerHTML = '';
    return;
  }
  
  const q = state.activeQuestions[state.currentQuestionIndex];
  
  // Progress Displays
  document.getElementById('current-q-index-display').textContent = state.currentQuestionIndex + 1;
  const progressPercent = Math.round((state.currentQuestionIndex / state.activeQuestions.length) * 100);
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('progress-percentage-display').textContent = `${progressPercent}%`;
  
  // Question Header
  const difficultyBadge = document.getElementById('q-difficulty-badge');
  difficultyBadge.textContent = `Chương ${q.chapter} • Độ khó: ${q.difficulty}`;
  difficultyBadge.className = 'badge';
  if (q.difficulty === 'Dễ') difficultyBadge.classList.add('badge-success');
  else if (q.difficulty === 'Trung bình') difficultyBadge.classList.add('badge-warning');
  else difficultyBadge.classList.add('badge-danger');
  
  // Bookmark button state
  const isBookmarked = state.userHistory.bookmarks.includes(getQuestionKey(q));
  const bookmarkBtn = document.getElementById('btn-bookmark-toggle');
  const outlineBookmark = bookmarkBtn.querySelector('.bookmark-outline');
  const filledBookmark = bookmarkBtn.querySelector('.bookmark-filled');
  if (isBookmarked) {
    bookmarkBtn.classList.add('btn-bookmark-active');
    outlineBookmark.classList.add('hide');
    filledBookmark.classList.remove('hide');
  } else {
    bookmarkBtn.classList.remove('btn-bookmark-active');
    outlineBookmark.classList.remove('hide');
    filledBookmark.classList.add('hide');
  }
  
  // Question Text
  // Format: "Câu 123 [<DE>]: Title" - clean up or show prefix nicely
  document.getElementById('question-text').textContent = `${q.header}: ${q.title}`;
  
  // Options rendering
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  // Check if answered
  let hasBeenAnswered = false;
  let userSelectedIdx = -1;
  
  if (state.quizMode === 'study') {
    // Read from persistent history
    const hist = state.userHistory.answers[getQuestionKey(q)];
    if (hist) {
      hasBeenAnswered = true;
      userSelectedIdx = hist.selectedIndex;
    }
  } else {
    // Read from current exam session answer
    if (q.examUserSelectedIndex !== undefined) {
      hasBeenAnswered = true;
      userSelectedIdx = q.examUserSelectedIndex;
    }
  }

  // Reset question button state (only visible in study mode if answered)
  const resetQuestionBtn = document.getElementById('btn-reset-current-question');
  if (resetQuestionBtn) {
    if (state.quizMode === 'study' && hasBeenAnswered) {
      resetQuestionBtn.classList.remove('hide');
    } else {
      resetQuestionBtn.classList.add('hide');
    }
  }
  
  q.options.forEach((opt, idx) => {
    const optDiv = document.createElement('div');
    optDiv.className = 'option-item';
    
    const letter = String.fromCharCode(65 + idx); // A, B, C, D
    optDiv.innerHTML = `
      <div class="option-prefix">${letter}</div>
      <div class="option-text">${opt.text}</div>
    `;
    
    // Add correct state class if needed
    if (state.quizMode === 'study') {
      if (hasBeenAnswered) {
        if (opt.is_correct) {
          optDiv.classList.add('correct');
        } else if (idx === userSelectedIdx) {
          optDiv.classList.add('wrong');
        }
      }
    } else {
      // Exam Mode - just show selected state
      if (hasBeenAnswered && idx === userSelectedIdx) {
        optDiv.classList.add('selected');
      }
    }
    
    // Clicking option
    optDiv.addEventListener('click', () => {
      if (state.quizMode === 'study') {
        if (hasBeenAnswered) return; // Can't change answer in study mode once clicked
        
        const isCorrect = opt.is_correct;
        state.userHistory.answers[getQuestionKey(q)] = {
          selectedIndex: idx,
          isCorrect: isCorrect
        };
        saveProgress();
        
        // Re-render immediately to show colors
        renderQuestion();
        updateGridItem(state.currentQuestionIndex);
      } else {
        // Exam Mode - can change answer
        q.examUserSelectedIndex = idx;
        
        // Re-render to update selected styling
        renderQuestion();
        updateGridItem(state.currentQuestionIndex);
      }
    });
    
    optionsContainer.appendChild(optDiv);
  });
  
  // Navigation Button Disabling
  document.getElementById('btn-prev-question').disabled = state.currentQuestionIndex === 0;
  
  // Next button behavior
  const nextBtn = document.getElementById('btn-next-question');
  if (state.currentQuestionIndex === state.activeQuestions.length - 1) {
    if (state.quizMode === 'exam') {
      nextBtn.disabled = true;
    } else {
      nextBtn.innerHTML = 'Xong <i class="lucide-check"></i>';
    }
  } else {
    nextBtn.disabled = false;
    nextBtn.innerHTML = 'Sau <i class="lucide-chevron-right"></i>';
  }
  
  // Render explanation box (only show when answered in study mode, or during post-exam review)
  const explanationContainer = document.getElementById('explanation-container');
  const explanationContentArea = document.getElementById('explanation-content-area');
  
  if (hasBeenAnswered && state.quizMode === 'study') {
    explanationContainer.classList.remove('hide');
    explanationContentArea.innerHTML = getQuestionExplanation(q);
  } else {
    explanationContainer.classList.add('hide');
  }
}

// Bookmark click handler
function toggleBookmark() {
  if (state.activeQuestions.length === 0) return;
  const q = state.activeQuestions[state.currentQuestionIndex];
  
  const qKey = getQuestionKey(q);
  const bIndex = state.userHistory.bookmarks.indexOf(qKey);
  if (bIndex === -1) {
    state.userHistory.bookmarks.push(qKey);
  } else {
    state.userHistory.bookmarks.splice(bIndex, 1);
  }
  
  saveProgress();
  renderQuestion();
  updateGridItem(state.currentQuestionIndex);
}

// Question Navigation Grid
function renderQuestionGrid() {
  const container = document.getElementById('question-grid-container');
  container.innerHTML = '';
  
  state.activeQuestions.forEach((q, idx) => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.id = `grid-item-${idx}`;
    gridItem.textContent = idx + 1;
    
    setGridItemState(gridItem, q, idx);
    
    gridItem.addEventListener('click', () => {
      const oldIdx = state.currentQuestionIndex;
      state.currentQuestionIndex = idx;
      renderQuestion();
      
      updateGridItem(oldIdx);
      updateGridItem(state.currentQuestionIndex);
      
      // On mobile, close sidebar after jumping
      if (window.innerWidth <= 768) {
        document.getElementById('quiz-navigation-sidebar').classList.remove('active');
      }
    });
    
    container.appendChild(gridItem);
  });
}

function setGridItemState(gridItem, q, idx) {
  // Clear classes
  gridItem.className = 'grid-item';
  if (idx === state.currentQuestionIndex) {
    gridItem.classList.add('current');
  }
  
  const isBookmarked = state.userHistory.bookmarks.includes(getQuestionKey(q));
  if (isBookmarked) {
    gridItem.classList.add('flagged');
  }
  
  if (state.quizMode === 'study') {
    const record = state.userHistory.answers[getQuestionKey(q)];
    if (record) {
      gridItem.classList.add(record.isCorrect ? 'correct' : 'wrong');
    }
  } else {
    // Exam mode
    if (q.examUserSelectedIndex !== undefined) {
      gridItem.classList.add('answered');
    }
  }
}

function updateGridItem(idx) {
  const gridItem = document.getElementById(`grid-item-${idx}`);
  if (gridItem) {
    const q = state.activeQuestions[idx];
    setGridItemState(gridItem, q, idx);
  }
}

// ==========================================================================
// Exam Timer Logic
// ==========================================================================
function startExamTimer() {
  stopExamTimer();
  state.examSecondsRemaining = state.examTimeLimitSeconds;
  updateTimerDisplay();
  
  state.examTimerInterval = setInterval(() => {
    state.examSecondsRemaining--;
    updateTimerDisplay();
    
    if (state.examSecondsRemaining <= 0) {
      stopExamTimer();
      alert('Hết giờ làm bài! Hệ thống tự động nộp bài thi.');
      submitExam();
    }
  }, 1000);
}

function stopExamTimer() {
  if (state.examTimerInterval) {
    clearInterval(state.examTimerInterval);
    state.examTimerInterval = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(state.examSecondsRemaining / 60);
  const seconds = state.examSecondsRemaining % 60;
  
  const minStr = String(minutes).padStart(2, '0');
  const secStr = String(seconds).padStart(2, '0');
  
  const timerElem = document.getElementById('exam-timer');
  timerElem.textContent = `${minStr}:${secStr}`;
  
  // Red color warning when less than 5 minutes
  const timerContainer = document.getElementById('exam-timer-wrapper');
  if (state.examSecondsRemaining < 5 * 60) {
    timerContainer.style.backgroundColor = 'rgba(244, 63, 94, 0.25)';
    timerContainer.style.color = '#ff4b6b';
  } else {
    timerContainer.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
    timerContainer.style.color = 'var(--color-danger)';
  }
}

// ==========================================================================
// Submit Exam & Show Results
// ==========================================================================
function submitExam() {
  stopExamTimer();
  
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  
  state.activeQuestions.forEach(q => {
    const userAnsIdx = q.examUserSelectedIndex;
    
    if (userAnsIdx === undefined) {
      skippedCount++;
      // Record in history as incorrect since it's skipped
      state.userHistory.answers[getQuestionKey(q)] = {
        selectedIndex: -1,
        isCorrect: false
      };
    } else {
      const correctOptIdx = q.options.findIndex(o => o.is_correct);
      const isCorrect = userAnsIdx === correctOptIdx;
      
      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
      
      // Update persistent history
      state.userHistory.answers[getQuestionKey(q)] = {
        selectedIndex: userAnsIdx,
        isCorrect: isCorrect
      };
    }
  });
  
  // Increment taken exam count
  state.userHistory.examsTakenCount++;
  saveProgress();
  
  // Format completion time
  const timeTakenSeconds = state.examTimeLimitSeconds - state.examSecondsRemaining;
  const minutesTaken = Math.floor(timeTakenSeconds / 60);
  const secondsTaken = timeTakenSeconds % 60;
  const timeTakenStr = `${String(minutesTaken).padStart(2, '0')}:${String(secondsTaken).padStart(2, '0')}`;
  
  // Render Results Page
  document.getElementById('result-datetime').textContent = `Hoàn thành lúc: ${new Date().toLocaleTimeString('vi-VN')} ngày ${new Date().toLocaleDateString('vi-VN')}`;
  document.getElementById('result-score').textContent = `${correctCount}/${state.activeQuestions.length}`;
  
  const scorePercent = Math.round((correctCount / state.activeQuestions.length) * 100);
  document.getElementById('result-score-percent').textContent = `${scorePercent}%`;
  
  document.getElementById('result-total-q').textContent = state.activeQuestions.length;
  document.getElementById('result-correct-q').textContent = correctCount;
  document.getElementById('result-wrong-q').textContent = wrongCount + skippedCount;
  document.getElementById('result-time-taken').textContent = timeTakenStr;
  
  switchView('results');
}

function reviewExamDetails() {
  // Switch back to quiz mode but in study view so they can review their answers
  state.quizMode = 'study';
  state.currentQuestionIndex = 0;
  
  // Hide exam-specific controls
  document.getElementById('exam-timer-wrapper').classList.add('hide');
  document.getElementById('btn-submit-exam').classList.add('hide');
  
  switchView('quiz');
  initQuizUI();
}

// ==========================================================================
// Event Listeners Initialization
// ==========================================================================
function initEventListeners() {
  // Navigation buttons
  document.getElementById('btn-home').addEventListener('click', () => switchView('dashboard'));
  document.getElementById('btn-back-dashboard').addEventListener('click', () => {
    if (state.quizMode === 'exam') {
      if (confirm('Bạn có chắc chắn muốn thoát bài thi thử này không? Tiến độ hiện tại của bài thi sẽ bị hủy.')) {
        switchView('dashboard');
      }
    } else {
      switchView('dashboard');
    }
  });
  document.getElementById('btn-results-home').addEventListener('click', () => switchView('dashboard'));
  
  // Special actions triggers
  document.getElementById('btn-start-exam').addEventListener('click', startExam);
  document.getElementById('btn-start-marathon').addEventListener('click', () => startPractice('marathon'));
  document.getElementById('btn-start-bookmarks').addEventListener('click', () => startPractice('bookmarks'));
  document.getElementById('btn-start-incorrects').addEventListener('click', () => startPractice('incorrects'));
  
  // Quiz view buttons
  document.getElementById('btn-prev-question').addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      const oldIdx = state.currentQuestionIndex;
      state.currentQuestionIndex--;
      renderQuestion();
      updateGridItem(oldIdx);
      updateGridItem(state.currentQuestionIndex);
    }
  });
  
  document.getElementById('btn-next-question').addEventListener('click', () => {
    if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
      const oldIdx = state.currentQuestionIndex;
      state.currentQuestionIndex++;
      renderQuestion();
      updateGridItem(oldIdx);
      updateGridItem(state.currentQuestionIndex);
    } else {
      // Done - go back
      if (state.quizMode === 'study') {
        switchView('dashboard');
      }
    }
  });
  
  document.getElementById('btn-bookmark-toggle').addEventListener('click', toggleBookmark);
  
  // Submit Exam
  document.getElementById('btn-submit-exam').addEventListener('click', () => {
    const unanswered = state.activeQuestions.filter(q => q.examUserSelectedIndex === undefined).length;
    let message = 'Bạn có chắc chắn muốn nộp bài thi thử này không?';
    if (unanswered > 0) {
      message = `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi không?`;
    }
    if (confirm(message)) {
      submitExam();
    }
  });
  
  document.getElementById('btn-review-exam').addEventListener('click', reviewExamDetails);
  
  // Reset current question
  const resetQuestionBtn = document.getElementById('btn-reset-current-question');
  if (resetQuestionBtn) {
    resetQuestionBtn.addEventListener('click', () => {
      if (state.activeQuestions.length === 0) return;
      const q = state.activeQuestions[state.currentQuestionIndex];
      
      // Delete user answer for this question
      delete state.userHistory.answers[getQuestionKey(q)];
      saveProgress();
      
      // Re-render
      renderQuestion();
      updateGridItem(state.currentQuestionIndex);
    });
  }

  // Reset current set (chapter, marathon, etc.)
  const resetSetBtn = document.getElementById('btn-reset-current-set');
  if (resetSetBtn) {
    resetSetBtn.addEventListener('click', () => {
      if (state.activeQuestions.length === 0) return;
      
      let message = 'Bạn có chắc chắn muốn làm lại toàn bộ câu hỏi trong phần này không? Tiến trình làm bài của phần này sẽ được làm sạch.';
      if (state.quizMode === 'exam') {
        message = 'Bạn có chắc chắn muốn làm lại bài thi từ đầu? Tất cả các câu đã trả lời trong lượt thi này sẽ bị xóa.';
      }
      
      if (confirm(message)) {
        if (state.quizMode === 'study') {
          // Delete persistent history for all active questions
          state.activeQuestions.forEach(q => {
            delete state.userHistory.answers[getQuestionKey(q)];
          });
          saveProgress();
        } else {
          // Clear exam selections
          state.activeQuestions.forEach(q => {
            delete q.examUserSelectedIndex;
          });
        }
        
        // Go back to the first question
        state.currentQuestionIndex = 0;
        
        // Re-render everything
        renderQuestion();
        renderQuestionGrid();
      }
    });
  }

  // Reset progress action
  document.getElementById('btn-reset-data').addEventListener('click', resetAllProgress);

  // Import DOCX files actions
  const btnImportDocx = document.getElementById('btn-import-docx');
  const inputDocxUpload = document.getElementById('input-docx-upload');
  const btnRestoreDefault = document.getElementById('btn-restore-default');

  if (btnImportDocx && inputDocxUpload) {
    btnImportDocx.addEventListener('click', () => {
      inputDocxUpload.click();
    });
  }

  if (inputDocxUpload) {
    inputDocxUpload.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        parseAndLoadDocxFiles(e.target.files);
      }
    });
  }

  if (btnRestoreDefault) {
    btnRestoreDefault.addEventListener('click', restoreDefaultQuestions);
  }
  
  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
  // Grid toggle (primarily mobile sliding drawer)
  const sidebar = document.getElementById('quiz-navigation-sidebar');
  document.getElementById('btn-toggle-grid').addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
  document.getElementById('btn-close-sidebar').addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  // Keyboard navigation for power-users (Luyện phím tắt tiện lợi)
  document.addEventListener('keydown', (e) => {
    if (state.currentView === 'quiz' && state.activeQuestions.length > 0) {
      if (e.key === 'ArrowLeft') {
        // Phím mũi tên Trái để quay lại câu trước
        const btn = document.getElementById('btn-prev-question');
        if (btn && !btn.disabled) btn.click();
      } else if (e.key === 'ArrowRight') {
        // Phím mũi tên Phải để sang câu tiếp theo
        const btn = document.getElementById('btn-next-question');
        if (btn && !btn.disabled) btn.click();
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        // Các phím A, B, C, D tương ứng chọn đáp án
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        const options = document.querySelectorAll('.option-item');
        if (options && options[idx]) {
          options[idx].click();
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        // Các phím 1, 2, 3, 4 tương ứng chọn đáp án
        const idx = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option-item');
        if (options && options[idx]) {
          options[idx].click();
        }
      } else if (e.key.toLowerCase() === 'f') {
        // Phím F để Đánh dấu (Flag/Bookmark) câu hỏi
        const btn = document.getElementById('btn-bookmark-toggle');
        if (btn) btn.click();
      }
    }
  });
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadProgress();
  updateDashboardStats();
  renderChapterList();
  initEventListeners();
});
