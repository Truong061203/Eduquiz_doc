# HCI EduQuiz - Ứng dụng Ôn thi Trắc nghiệm Tương tác Người - Máy

HCI EduQuiz là một ứng dụng Web trắc nghiệm offline (không cần máy chủ) trực quan và hiện đại, được thiết kế đặc biệt để tối ưu hóa việc ôn tập thi trắc nghiệm môn **Tương tác Người - Máy (HCI - Human-Computer Interaction)** với cơ sở dữ liệu mặc định gồm **688 câu hỏi ôn tập** chia làm 4 chương.

Đặc biệt, ứng dụng tích hợp sẵn bộ phân tích file đề cương trực tiếp trên trình duyệt, cho phép người dùng khác tự tải lên file `.docx` của bất kỳ môn học nào khác để tạo giao diện ôn tập tương ứng.

---

## ✨ Các tính năng nổi bật

1. **Luyện tập theo chương (Study Mode)**: Hiển thị đáp án đúng/sai ngay lập tức khi click chọn, kèm theo hộp giải thích và liên tưởng từ khóa.
2. **Liên tưởng từ khóa thông minh (Keyword Memory Association)**: Trích xuất và đối sánh các cặp từ khóa chính của câu hỏi với đáp án bôi đỏ, giúp ghi nhớ đáp án cực nhanh phục vụ thi trắc nghiệm.
3. **Thi thử tổng hợp (Mock Exam)**: Đề thi thử ngẫu nhiên 40 câu trắc nghiệm từ tất cả các chương với đồng hồ đếm ngược 40 phút. Tự động chấm điểm và phân tích kết quả chi tiết sau khi nộp bài.
4. **Bộ lọc thông minh & Bookmark**: 
   * Đánh dấu (Bookmark) những câu hỏi khó để ôn tập lại riêng.
   * Luyện tập tập trung các câu trả lời sai gần đây để khắc phục lỗ hổng kiến thức.
5. **Bộ phím tắt điều hướng nhanh (Pro-user Keyboard Shortcuts)**:
   * `Mũi tên Trái / Phải`: Quay lại câu trước / chuyển sang câu tiếp theo.
   * `A`, `B`, `C`, `D` hoặc `1`, `2`, `3`, `4`: Chọn nhanh các phương án trả lời tương ứng.
   * `F`: Bật/tắt đánh dấu Bookmark câu hỏi hiện tại.
6. **Làm lại & Ôn tập linh hoạt (Reset & Redo)**:
   * Reset từng câu riêng lẻ để làm lại.
   * Reset toàn bộ câu hỏi trong bộ đề đang làm để ôn tập lại từ đầu.
   * Reset tiến trình của từng chương ngay tại Trang chủ.
7. **Tự nạp đề cương của môn học khác (Client-side DOCX Importer)**: Tải lên các file `.docx` bất kỳ để ôn tập môn học khác. Quá trình xử lý diễn ra hoàn toàn trên trình duyệt bằng JavaScript (sử dụng `JSZip`), không cần gửi file lên máy chủ, đảm bảo bảo mật và chạy offline 100%.

---

## 🛠️ Hướng dẫn cài đặt, vận hành và chia sẻ cho bạn bè

Dự án này được tối ưu hóa để có thể chạy cực kỳ linh hoạt. Dưới đây là hướng dẫn chi tiết dành cho cả bạn bè của bạn (không biết gì về lập trình) và nhà phát triển:

---

### 🌟 DÀNH CHO BẠN BÈ (Không cần cài đặt, không cần biết lập trình)

Nếu bạn muốn chia sẻ ứng dụng này cho bạn bè học cùng mà họ không biết lập trình hay chạy dòng lệnh, bạn có hai cách cực kỳ đơn giản sau:

#### Cách 1: Chạy online qua GitHub Pages (KHUYÊN DÙNG - Đơn giản nhất)
Bạn có thể tự kích hoạt tính năng chạy online miễn phí của GitHub để gửi đường link web cho bạn bè mở trên điện thoại hoặc máy tính:
1. Trên trang kho lưu trữ GitHub của bạn (`Eduquiz_doc`), bấm vào mục **Settings** (Cài đặt) ở trên cùng.
2. Tại danh sách bên trái, chọn mục **Pages**.
3. Tại phần **Build and deployment** -> mục **Branch**, bạn chuyển từ `None` sang **`main`** (thư mục `/ (root)` giữ nguyên) rồi bấm **Save**.
4. Chờ khoảng 1 - 2 phút, trang sẽ hiện ra đường link web hoạt động của bạn dạng: `https://ten-tai-khoan.github.io/Eduquiz_doc/`.
5. Bạn chỉ cần gửi đường link này cho bạn bè. Họ có thể click mở học ôn thi ngay lập tức trên mọi thiết bị.

#### Cách 2: Đóng gói gửi file chạy Offline
Nếu bạn muốn gửi trọn bộ phần mềm chạy offline trực tiếp trên máy tính của bạn bè:
1. Bạn chạy lệnh build trên máy của bạn (Xem phần *Dành cho nhà phát triển* ở dưới).
2. Nén thư mục `dist/` vừa sinh ra thành file `.zip` và gửi cho bạn bè.
3. Bạn bè giải nén ra máy tính của họ.
4. Để tránh các lỗi bảo mật về CORS của một số trình duyệt khi mở file cục bộ, họ chỉ cần:
   * **Cách đơn giản**: Cài đặt extension **Live Server** trong VS Code và bấm *Go Live*.
   * **Hoặc**: Mở trực tiếp file `index.html` trong thư mục `dist` bằng trình duyệt Firefox (Firefox hỗ trợ mở module trực tiếp từ file:// mà không bị chặn bảo mật như Chrome/Safari).

---

### 💻 DÀNH CHO NHÀ PHÁT TRIỂN (Chạy code và chỉnh sửa dưới local)

#### Yêu cầu hệ thống
* Máy tính đã cài đặt **Node.js** (Khuyến nghị phiên bản 18 trở lên).

#### Bước 1: Cài đặt các thư viện (Dependencies)
Mở terminal tại thư mục dự án (`eduquiz/`) và chạy lệnh sau:
```bash
npm install
```

#### Bước 2: Chạy ứng dụng ở chế độ phát triển (Development)
Khởi động máy chủ xem trước lập trình:
```bash
npm run dev
```
Mở liên kết cục bộ hiển thị trên terminal (ví dụ: `http://localhost:5173`) để trải nghiệm ứng dụng.

#### Bước 3: Đóng gói dự án (Build Production)
Tạo ra thư mục đóng gói `dist/` tối ưu hóa:
```bash
npm run build
```

---

---

## 📝 Hướng dẫn chuẩn bị file `.docx` để nạp đề cương môn học khác

Để nạp thành công file đề cương của các môn học khác vào phần mềm qua nút **"Nạp Đề Cương Mới (.docx)"**, file Word của anh cần tuân thủ đúng cấu trúc định dạng sau:

1. **Từ khóa câu hỏi**: Bắt đầu bằng từ khóa `"Câu "` kèm số thứ tự ở đầu mỗi câu (Ví dụ: `Câu 1:`, `Câu 2 [DE]:`).
2. **Ký hiệu phân tách đáp án**: Thay thế các ký tự lựa chọn phương án bằng ký hiệu `[<$>]` (Ví dụ: `[<$>] Đáp án A`, `[<$>] Đáp án B`).
3. **Đánh dấu đáp án đúng**: Bôi màu đỏ chữ (mã màu RGB đỏ chuẩn: `FF0000`) cho đáp án chính xác hoặc ký hiệu `[<$>]` của đáp án đó.

**Ví dụ định dạng chuẩn trong file Word:**
> **Câu 1**: Đâu là định nghĩa đúng về tương tác Người - Máy?
> `[<$>]` Là nghiên cứu về thiết bị phần cứng.
> `[<$>]` Là nghiên cứu thiết kế giao diện giữa con người và máy tính (Chữ dòng này được bôi màu đỏ trong Word)
> `[<$>]` Là lập trình ứng dụng cơ sở dữ liệu.
