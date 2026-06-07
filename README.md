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

## 🛠️ Hướng dẫn cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
* Máy tính đã cài đặt **Node.js** (Khuyến nghị phiên bản 18 trở lên).

### Bước 1: Cài đặt các thư viện (Dependencies)
Mở terminal tại thư mục dự án (`eduquiz/`) và chạy lệnh sau để cài đặt các thư viện cần thiết:
```bash
npm install
```

### Bước 2: Chạy ứng dụng ở chế độ nhà phát triển (Development)
Khởi động máy chủ xem trước lập trình:
```bash
npm run dev
```
Sau khi chạy, terminal sẽ cung cấp một liên kết cục bộ (ví dụ: `http://localhost:5173`). Anh chỉ cần mở liên kết này trên trình duyệt để sử dụng ứng dụng.

### Bước 3: Đóng gói dự án để chạy offline hoặc chia sẻ (Build Production)
Để tạo ra phiên bản sản phẩm tĩnh siêu nhẹ để mang sang máy tính khác chạy trực tiếp không cần Node.js:
```bash
npm run build
```
Lệnh này sẽ tạo ra thư mục `dist/` chứa file `index.html` và các file CSS/JS đã được tối ưu hóa và nén nhỏ gọn.
* **Cách sử dụng**: Anh chỉ cần nén thư mục `dist/` này gửi cho người khác, họ giải nén và kích đúp mở trực tiếp file `index.html` trên trình duyệt là có thể sử dụng đầy đủ các tính năng.

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
