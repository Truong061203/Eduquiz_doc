

# HCI EduQuiz - Ứng dụng Ôn thi Trắc nghiệm Tương tác Người - Máy

HCI EduQuiz là một ứng dụng Web trắc nghiệm offline trực quan và hiện đại, được thiết kế đặc biệt để giúp bạn ôn luyện thi trắc nghiệm môn **Tương tác Người - Máy (HCI - Human-Computer Interaction)** với bộ đề cương mặc định gồm **688 câu hỏi trắc nghiệm** chia làm 4 chương.

Ngoài ra, dự án được tích hợp sẵn bộ nạp đề cương thông minh từ file `.docx`. Bạn có thể dùng chính mã nguồn này để nạp đề cương của các môn học khác để tự luyện tập.

---

## ✨ Các tính năng chính trong mã nguồn

1. **Luyện tập theo chương (Study Mode)**: Click chọn và xem ngay kết quả đúng/sai lập tức, hiển thị hộp giải thích chi tiết.
2. **🧠 Thẻ liên tưởng ghi nhớ nhanh (Keyword Association)**: Tự động trích xuất cặp từ khóa chính giữa câu hỏi và đáp án đúng, giúp bạn nhớ nhanh đáp án trắc nghiệm chỉ trong vài giây.
3. **⏱️ Thi thử tổng hợp (Mock Exam)**: Đề thi ngẫu nhiên 40 câu trắc nghiệm từ tất cả các chương với đồng hồ đếm ngược 40 phút. Tự động chấm điểm và tổng hợp kết quả chi tiết sau khi nộp bài.
4. **📌 Đánh dấu & Luyện câu sai**:
   * Lưu lại các câu hỏi khó bằng nút **Bookmark** để ôn tập riêng.
   * Chức năng luyện tập lại các câu đã làm sai gần đây để cải thiện kiến thức.
5. **⌨️ Phím tắt tiện lợi cho Power-user**:
   * Phím `Mũi tên Trái / Phải`: Chuyển lùi / chuyển tiến câu hỏi.
   * Phím `A, B, C, D` hoặc `1, 2, 3, 4`: Chọn nhanh phương án trả lời.
   * Phím `F`: Bật/Tắt đánh dấu Bookmark câu hỏi hiện tại.
6. **🔄 Làm lại & Reset linh hoạt**: Hỗ trợ reset làm lại từng câu, làm lại bộ đề hiện tại hoặc xóa tiến trình của riêng từng chương.
7. **📂 Bộ nạp đề cương môn khác (Client-side DOCX Importer)**: Đọc file `.docx` trực tiếp trên trình duyệt bằng `JSZip`, tự động quét đáp án chữ màu đỏ và chuyển thành bộ đề trắc nghiệm mới trên giao diện.

---

## 🛠️ Hướng dẫn cài đặt và chạy mã nguồn trên máy tính (Local)

Dành cho các bạn nhận được mã nguồn và muốn tự chạy chương trình trên máy cá nhân:

### Bước 1: Cài đặt môi trường chạy (Node.js)
Để chạy được mã nguồn của dự án này, máy tính của bạn cần cài đặt **Node.js**:
* Truy cập trang chủ: [https://nodejs.org/](https://nodejs.org/)
* Tải xuống và cài đặt phiên bản khuyến nghị **LTS** (thường là bản dành cho số đông người dùng). Bấm Next và cài đặt như phần mềm thông thường.

### Bước 2: Cài đặt các thư viện bổ trợ (Dependencies)
1. Mở ứng dụng **Terminal** (trên máy Mac) hoặc **Command Prompt / PowerShell** (trên Windows).
2. Di chuyển vào thư mục dự án `eduquiz` (hoặc mở thư mục này bằng VS Code rồi mở Terminal tích hợp lên).
3. Chạy lệnh cài đặt sau:
   ```bash
   npm install
   ```
   *(Lệnh này sẽ tự động tải thư viện xử lý file zip `jszip` và công cụ đóng gói `vite` về máy).*

### Bước 3: Khởi chạy ứng dụng ôn tập
Sau khi cài đặt xong, bạn chạy lệnh sau để chạy ứng dụng:
```bash
npm run dev
```
Sau khi chạy thành công, Terminal sẽ hiện ra đường link chạy thử cục bộ như sau:
```text
  ➜  Local:   http://localhost:5173/
```
* **Cách mở**: Bạn chỉ cần click chuột vào đường link đó hoặc copy dán vào trình duyệt web (Chrome, Edge, Cốc Cốc...) để bắt đầu học.

### Bước 4: Đóng gói sản phẩm (Tùy chọn)
Nếu muốn đóng gói mã nguồn thành một thư mục web tĩnh siêu nhẹ để mở offline nhanh hơn mà không cần chạy server Node.js:
```bash
npm run build
```
Thư mục `dist/` sẽ được tạo ra, bạn chỉ cần mở file `index.html` trong đó bằng trình duyệt Firefox để học offline bình thường.

---

## 📂 Tìm hiểu cấu trúc mã nguồn dự án

Dự án sử dụng kiến trúc Web tối giản nhưng hiệu quả cao. Bạn có thể mở các file sau để xem xét và chỉnh sửa:
* [index.html](file:///Users/truongnd/Documents/Learn/eduquiz/index.html): File cấu trúc giao diện chính của ứng dụng web.
* [src/app.js](file:///Users/truongnd/Documents/Learn/eduquiz/src/app.js): File điều khiển toàn bộ logic hoạt động, phím tắt, bộ đếm thời gian, nạp file `.docx` và lưu lịch sử học tập.
* [src/style.css](file:///Users/truongnd/Documents/Learn/eduquiz/src/style.css): File định nghĩa giao diện (Dark/Light mode, hiệu ứng mượt mà, màu sắc, font chữ).
* [src/questions.js](file:///Users/truongnd/Documents/Learn/eduquiz/src/questions.js): Chứa dữ liệu mảng JavaScript của 688 câu hỏi trắc nghiệm mặc định.
* [questions.json](file:///Users/truongnd/Documents/Learn/eduquiz/questions.json): Dạng file JSON thuần túy dùng để dễ dàng chia sẻ hoặc gửi vào các chatbot AI (như Gemini) để tra cứu đáp án.

---

## 📝 Định dạng file `.docx` yêu cầu khi nạp môn học mới

Để bộ nạp tự động nhận diện chính xác câu hỏi và đáp án khi bạn tải lên môn học mới:
1. Mỗi câu hỏi bắt đầu bằng chữ `"Câu "` kèm số thứ tự (Ví dụ: `Câu 1:`, `Câu 2 [DE]:`).
2. Các phương án trả lời phân cách bằng ký tự đặc biệt `[<$>]` ở đầu dòng.
3. Đáp án chính xác của câu đó phải được bôi màu chữ đỏ nguyên bản (`FF0000`) trong file Word.

**Ví dụ cấu trúc trong file Word:**
> **Câu 1**: Tương tác Người - Máy là gì?
> `[<$>]` Là nghiên cứu về thiết bị phần cứng.
> `[<$>]` Là nghiên cứu thiết kế giao diện giữa con người và máy tính (Chữ dòng này được bôi màu đỏ trong Word)
> `[<$>]` Là lập trình ứng dụng cơ sở dữ liệu.

