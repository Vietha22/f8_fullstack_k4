CREATE TABLE PHONG (
  MaPhong character varying(10) PRIMARY KEY,
  LoaiPhong character varying(10) NOT NULL, 
  SoKhachToiDa INTEGER NOT NULL, 
  GiaPhong NUMERIC(10, 2) NOT NULL, 
  MoTa character varying(100),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE KHACH_HANG (
  MaKH character varying(10) PRIMARY KEY,
  TenKH character varying(100) NOT NULL, 
  DiaChi character varying(100), 
  SoDT character varying(20),
	created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE DICH_VU_DI_KEM (
  MaDV character varying(10) PRIMARY KEY, 
  TenDV character varying(100) NOT NULL, 
  DonViTinh character varying(10) NOT NULL, 
  DonGia NUMERIC(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE DAT_PHONG (
  MaDatPhong character varying(10) PRIMARY KEY, 
  MaPhong character varying(10) NOT NULL, 
  MaKH character varying(10) NOT NULL, 
  NgayDat DATE NOT NULL, 
  GioBatDau TIME NOT NULL, 
  GioKetThuc TIME NOT NULL, 
  TienDatCoc NUMERIC(10, 2) NOT NULL, 
  GhiChu character varying(100),
  TrangThaiDat character varying(10) NOT NULL,
  FOREIGN KEY (MaPhong) REFERENCES PHONG (MaPhong),
  FOREIGN KEY (MaKH) REFERENCES KHACH_HANG (MaKH),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE CHI_TIET_SU_DUNG_DICH_VU (
  MaDatPhong character varying(10) NOT NULL, 
  MaDV character varying(10) NOT NULL,
  SoLuong INTEGER NOT NULL, 
  PRIMARY KEY (MaDatPhong, MaDV),
  FOREIGN KEY (MaDatPhong) REFERENCES DAT_PHONG (MaDatPhong),
  FOREIGN KEY (MaDV) REFERENCES DICH_VU_DI_KEM (MaDV),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Thêm dữ liệu vào bảng PHONG
INSERT INTO PHONG (MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MoTa)
VALUES
('P0001', 'Loai 1', 20, 60000, NULL),
('P0002', 'Loai 1', 25, 80000, NULL),
('P0003', 'Loai 2', 15, 50000, NULL),
('P0004', 'Loai 3', 20, 50000, NULL);

-- Thêm dữ liệu vào bảng KHACH_HANG
INSERT INTO KHACH_HANG (MaKH, TenKH, DiaChi, SoDT)
VALUES
('KHH001', 'Nguyen Van A', 'Hoa xuan', '111111111'),
('KHH002', 'Nguyen Van B', 'Hoa hai', '111111112'),
('KHH003', 'Phan Van A', 'Cam le', '111113'),
('KHH004', 'Phan Van B', 'Hoa xuan', '111114');

-- Thêm dữ liệu vào bảng DICH_VU_DI_KEM
INSERT INTO DICH_VU_DI_KEM (MaDV, TenDV, DonViTinh, DonGia)
VALUES
('DV001', 'Beer', 'lon', 10000),
('DV002', 'Nuoc ngot', 'lon', 8000),
('DV003', 'Trai cay', 'dia', 35000),
('DV004', 'Khan uot', 'cai', 2000);

-- Thêm dữ liệu vào bảng DAT_PHONG
INSERT INTO DAT_PHONG (MaDatPhong, MaPhong, MaKH, NgayDat, GioBatDau, GioKetThuc, TienDatCoc, GhiChu, TrangThaiDat)
VALUES
('DP0001', 'P0001', 'KHH002', '2024-01-01', '08:00:00', '10:00:00', 100000, NULL, 'Da dat'),
('DP0002', 'P0002', 'KHH003', '2024-01-02', '09:00:00', '11:00:00', 200000, NULL, 'Da huy'),
('DP0003', 'P0003', 'KHH002', '2024-01-03', '10:00:00', '12:00:00', 150000, NULL, 'Da dat'),
('DP0004', 'P0004', 'KHH001', '2024-01-04', '11:00:00', '13:00:00', 150000, NULL, 'Da dat');

-- Thêm dữ liệu vào bảng CHI_TIET_SU_DUNG_DICH_VU
INSERT INTO CHI_TIET_SU_DUNG_DICH_VU (MaDatPhong, MaDV, SoLuong)
VALUES
('DP0001', 'DV001', 20),
('DP0001', 'DV003', 3),
('DP0001', 'DV002', 10),
('DP0002', 'DV002', 10),
('DP0002', 'DV003', 1),
('DP0003', 'DV003', 2),
('DP0003', 'DV004', 10);

-- Câu 1:
-- Hiển thị thông tin đặt phòng
SELECT
  dp.MaDatPhong, 
  dp.MaPhong, 
  p.LoaiPhong, 
  p.GiaPhong, 
  kh.TenKH, 
  dp.NgayDat, 
  p.GiaPhong * EXTRACT(epoch FROM (dp.GioKetThuc - dp.GioBatDau)) AS TongTienHat, 
  COALESCE(SUM(ctdv.SoLuong * dv.DonGia), 0) AS TongTienSuDungDichVu, 
  p.GiaPhong * EXTRACT(epoch FROM (dp.GioKetThuc - dp.GioBatDau)) + COALESCE(SUM(ctdv.SoLuong * dv.DonGia), 0) AS TongTienThanhToan 
FROM DAT_PHONG dp 
JOIN PHONG p ON dp.MaPhong = p.MaPhong 
JOIN KHACH_HANG kh ON dp.MaKH = kh.MaKH 
LEFT JOIN CHI_TIET_SU_DUNG_DICH_VU ctdv ON dp.MaDatPhong = ctdv.MaDatPhong 
LEFT JOIN DICH_VU_DI_KEM dv ON ctdv.MaDV = dv.MaDV 
GROUP BY dp.MaDatPhong, dp.MaPhong, p.LoaiPhong, p.GiaPhong, kh.TenKH, dp.NgayDat, dp.GioBatDau, dp.GioKetThuc 
ORDER BY dp.MaDatPhong; 

-- Câu 2:
-- Hiển thị thông tin khách hàng đã đặt phòng karaoke ở Hoa xuan
SELECT
  kh.MaKH, 
  kh.TenKH, 
  kh.DiaChi, 
  kh.SoDT 
FROM KHACH_HANG kh 
JOIN DAT_PHONG dp ON kh.MaKH = dp.MaKH 
WHERE kh.DiaChi = 'Hoa xuan'; 

-- Câu 3: 
SELECT
  p.MaPhong, 
  p.LoaiPhong, 
  p.SoKhachToiDa, 
  p.GiaPhong, 
  COUNT(dp.MaDatPhong) AS SoLanDat 
FROM PHONG p 
JOIN DAT_PHONG dp ON p.MaPhong = dp.MaPhong 
GROUP BY p.MaPhong, p.LoaiPhong, p.SoKhachToiDa, p.GiaPhong, dp.TrangThaiDat 
HAVING COUNT(dp.MaDatPhong) > 2 
AND dp.TrangThaiDat = 'Da dat'; 




