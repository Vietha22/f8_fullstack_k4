-- Tạo bảng courses
CREATE TABLE courses (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price FLOAT,
  detail TEXT,
  teacher_id INT NOT NULL,
  active INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Thêm trường description kiểu text và NULL
ALTER TABLE courses
ADD description TEXT NULL
BEFORE detail;

-- Đổi tên trường detail thành content và ràng buộc chuyển thành NOT NULL
ALTER TABLE courses
CHANGE detail content TEXT NOT NULL;

-- Tạo bảng teacher
CREATE TABLE teacher (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  bio TEXT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Thêm 3 giảng viên vào bảng teacher
INSERT INTO teacher (id, name, bio, created_at, updated_at)
VALUES
(1, 'Nguyễn Văn A', 'Giảng viên lập trình web', NOW(), NOW()),
(2, 'Trần Thị B', 'Giảng viên phân tích dữ liệu', NOW(), NOW()),
(3, 'Lê Văn C', 'Giảng viên trí tuệ nhân tạo', NOW(), NOW());

-- Thêm 3 khóa học cho mỗi giảng viên vào bảng courses
INSERT INTO courses (id, name, price, description, content, teacher_id, active, created_at, updated_at)
VALUES
(1, 'Khóa học 1', 1000, 'Desc khóa học 1', 'Content khóa học 1', 1, 1, NOW(), NOW()),
(2, 'Khóa học 2', 2000, 'Desc khóa học 2', 'Content khóa học 2', 1, 1, NOW(), NOW()),
(3, 'Khóa học 3', 3000, 'Desc khóa học 3', 'Content khóa học 3', 1, 1, NOW(), NOW()),
(4, 'Khóa học 4', 4000, 'Desc khóa học 4', 'Content khóa học 4', 2, 1, NOW(), NOW()),
(5, 'Khóa học 5', 5000, 'Desc khóa học 5', 'Content khóa học 5', 2, 1, NOW(), NOW()),
(6, 'Khóa học 6', 6000, 'Desc khóa học 6', 'Content khóa học 6', 2, 1, NOW(), NOW()),
(7, 'Khóa học 7', 7000, 'Desc khóa học 7', 'Content khóa học 7', 3, 1, NOW(), NOW()),
(8, 'Khóa học 8', 8000, 'Desc khóa học 8', 'Content khóa học 8', 3, 1, NOW(), NOW()),
(9, 'Khóa học 9', 9000, 'Desc khóa học 9', 'Content khóa học 9', 3, 1, NOW(), NOW());

-- Sửa tên và giá từng khóa học thành tên mới và giá mới
UPDATE courses
SET name = 'HTML và CSS', price = 1500, updated_at = NOW()
WHERE id = 1;

UPDATE courses
SET name = 'JavaScript', price = 1800, updated_at = NOW()
WHERE id = 2;

UPDATE courses
SET name = 'PHP', price = 2500, updated_at = NOW()
WHERE id = 3;

UPDATE courses
SET name = 'Javascript nâng cao', price = 800, updated_at = NOW()
WHERE id = 4;

UPDATE courses
SET name = 'Python nâng cao', price = 900, updated_at = NOW()
WHERE id = 5;

UPDATE courses
SET name = 'C++', price = 1200, updated_at = NOW()
WHERE id = 6;

UPDATE courses
SET name = 'ReactJS cơ bản', price = 2000, updated_at = NOW()
WHERE id = 7;

UPDATE courses
SET name = 'ReactJS nâng cao', price = 3400, updated_at = NOW()
WHERE id = 8;

UPDATE courses
SET name = 'NodeJS cơ bản', price = 1600, updated_at = NOW()
WHERE id = 9;

-- Sửa lại bio của giảng viên Nguyễn Văn A
UPDATE teacher
SET bio = 'Giảng viên khoa học máy tính', updated_at = NOW()
WHERE id = 1;

-- Sửa lại bio của giảng viên Trần Thị B
UPDATE teacher
SET bio = 'Giảng viên hệ thống thông tin', updated_at = NOW()
WHERE id = 2;

-- Sửa lại bio của giảng viên Lê Văn C
UPDATE teacher
SET bio = 'Giảng viên mạng máy tính', updated_at = NOW()
WHERE id = 3;

-- SELECT * FROM courses;
-- SELECT * FROM teacher;