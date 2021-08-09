# Api-News
I) Giới thiệu chung
    - Đây là dự án học tập cá nhân, vì vậy nếu có sai sót mong mọi người feedback nhiệt tình
    Project này là một API về tin tức, bao gồm :
        Thể loại
        Loại tin
        Tin tức 
        Comment
        User
    - Các model bao gồm đầy đủ các chức năng: tìm kiếm(một hoặc nhiều document cùng lúc), tìm kiếm các doc đã xóa, tìm kiếm các doc theo phân trang, update, delete(không hoàn toàn),restore, deleted vĩnh viễn

II) Chi tiết

    1) Thể Loại:
        a) Hiển thị toàn bộ danh sách Thể Loại 
            url : https://news-api1412.herokuapp.com/theloai/showAll

        b) Tìm kiếm doc theo id
            url : https://news-api1412.herokuapp.com/theloai/findById/:id
            vd  : https://news-api1412.herokuapp.com/theloai/findById/60f54d2eee4aa346183b9804

        c) Tìm kiếm doc đã xóa, nhưng chưa xóa vĩnh viễn theo id
            url : https://news-api1412.herokuapp.com/theloai/findById-deleted/:id
            vd  : https://news-api1412.herokuapp.com/theloai/findById-deleted/60f54d2eee4aa346183b9804

        d) Tìm kiếm doc chưa xóa hoặc đã xóa(chưa xóa vĩnh viễn)
            url : https://news-api1412.herokuapp.com/theloai/find-one-with-deleted/:id
            vd  : https://news-api1412.herokuapp.com/theloai/find-one-with-deleted/60f54d2eee4aa346183b9804

        e) Tìm kiếm các doc theo phân trang
            url : https://news-api1412.herokuapp.com/theloai/findByPage?page=a&size=b
            vd  : https://news-api1412.herokuapp.com/theloai/findByPage?page=2&size=10
            Mặc định page=1 và size=3

        f) Tạo mới một Thể Loại 
            body:
                {
                    "Ten": "Thế giới game",
                    "TenKhongDau": "the-gioi-game"
                }
            
            url : https://news-api1412.herokuapp.com/theloai/add-the-loai

        g) update Thể Loại theo id
            body:
                {
                    "Ten": "Thể Loại update",
                    "TenKhongDau": "the-loai-update"
                }
            url : https://news-api1412.herokuapp.com/theloai/updateById/:id
            vd  : https://news-api1412.herokuapp.com/theloai/updateById/60f54d2eee4aa346183b9804

        h) delete Thể Loại theo id(Không xóa hoàn toàn doc, doc vẫn còn trong database)
            url : https://news-api1412.herokuapp.com/theloai/deleteById/:id
            vd  : https://news-api1412.herokuapp.com/theloai/deleteById/60f54d2eee4aa346183b9804
        
        i) Restore Thể Loại theo id 
            url : https://news-api1412.herokuapp.com/theloai/restoreById/:id
            vd  : https://news-api1412.herokuapp.com/theloai/restoreById/60f54d2eee4aa346183b9804

        k) Xóa vĩnh viễn Thể Loại theo id 
            url : https://news-api1412.herokuapp.com/theloai/pemaneterly-delete-by-id/:id
            vd  : https://news-api1412.herokuapp.com/theloai/pemaneterly-delete-by-id/60f54d2eee4aa346183b9804


    2) Loại tin
        a) Hiển thị toàn bộ danh sách Loại Tin 
            url : https://news-api1412.herokuap.com/loaitin/showAll

        b) Tìm kiếm doc theo id
            url : https://news-api1412.herokuapp.com/loaitin/findById/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/findById/60f93310b486ed3509237dba

        c) Tìm kiếm doc đã xóa, nhưng chưa xóa vĩnh viễn theo id
            url : https://news-api1412.herokuapp.com/loaitin/findById-deleted/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/findById-deleted/60f93310b486ed3509237dba

        d) Tìm kiếm doc chưa xóa hoặc đã xóa(chưa xóa vĩnh viễn)
            url : https://news-api1412.herokuapp.com/loaitin/find-one-with-deleted/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/find-one-with-deleted/60f93310b486ed3509237dba

        e) Tìm kiếm các doc theo phân trang
            url : https://news-api1412.herokuapp.com/loaitin/findByPage?page=a&size=b
            vd  : https://news-api1412.herokuapp.com/loaitin/findByPage?page=2&size=10
            Mặc định page=1 và size=3

        f) Tạo mới một Loại Tin 
            body:
                {
                    "idTheLoai": "60f54d2eee4aa346183b9804",
                    "Ten": "loai tin mới update",
                    "TenKhongDau": "loai-tin-moi-update"
                }
            
            url : https://news-api1412.herokuapp.com/loaitin/add-the-loai

        g) update Loại Tin theo id
            body:
                {
                    "idTheLoai": "60f54d2eee4aa346183b9804",
                    "Ten": "loai tin mới update",
                    "TenKhongDau": "loai-tin-moi-update"
                }
            url : https://news-api1412.herokuapp.com/loaitin/updateById/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/updateById/60f93310b486ed3509237dba

        h) delete Loại Tin theo id(Không xóa hoàn toàn doc, doc vẫn còn trong database)
            url : https://news-api1412.herokuapp.com/loaitin/deleteById/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/deleteById/60f93310b486ed3509237dba
        
        i) Restore Loại Tin theo id 
            url : https://news-api1412.herokuapp.com/loaitin/restoreById/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/restoreById/60f93310b486ed3509237dba

        k) Xóa vĩnh viễn Loại Tin theo id 
            url : https://news-api1412.herokuapp.com/loaitin/pemaneterly-delete-by-id/:id
            vd  : https://news-api1412.herokuapp.com/loaitin/pemaneterly-delete-by-id/60f93310b486ed3509237dba

    3) Tin Tức
        a) Hiển thị toàn bộ danh sách Tin Tức
            url : https://news-api1412.herokuapp.com/tintuc/showAll

        b) Tìm kiếm doc theo id
            url : https://news-api1412.herokuapp.com/tintuc/findById/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/findById/610ffac9e916df221b60b3b7

        c) Tìm kiếm doc đã xóa, nhưng chưa xóa vĩnh viễn theo id
            url : https://news-api1412.herokuapp.com/tintuc/findById-deleted/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/findById-deleted/610ffac9e916df221b60b3b7

        d) Tìm kiếm doc chưa xóa hoặc đã xóa(chưa xóa vĩnh viễn)
            url : https://news-api1412.herokuapp.com/tintuc/find-one-with-deleted/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/find-one-with-deleted/610ffac9e916df221b60b3b7

        e) Tìm kiếm các doc theo phân trang
            url : https://news-api1412.herokuapp.com/tintuc/findByPage?page=a&size=b
            vd  : https://news-api1412.herokuapp.com/tintuc/findByPage?page=2&size=10
            Mặc định page=1 và size=3

        f) Tạo mới một Tin tức
            body:
                {
                    "TieuDe": "Tiêu đề loại tin tức mới",
                    "TieuDeKhongDau": "Tieu-de-loai-tin-tuc-moi",
                    "TomTat": "demo phan add tin tuc moi",
                    "NoiDung": "<\/h3>Nội dung tin tức: Khoá học Lập trình PHP tại trung tâm đào tạo tin học khoa phạm<\/h3>\r\n    \t<p>\r\n    \t<b>Hotline kỹ thuật <b>: 0967 908 907<br>\r\n    \t<b>Hotline tư vấn kháo học <b>: 094 276 4080<br>\r\n    \t<b>Địa chỉ <\/b>: 90 Lê Thị Riêng, P.Bến Thành, Q1, TPHCM<br>\r\n    \t<b>Website<\/b>: khoapham.vn<br>\r\n    \t<b>Học Online tại :<\/b>online.khoapham.vn<br>\r\n    \t<\/p>",
                    "Hinh": "FPT-2.jpg",
                    "NoiBat": "1",
                    "SoLuotXem": "0",
                    "idLoaiTin": "60f5512e5a3356492485766e"
                }
            
            url : https://news-api1412.herokuapp.com/tintuc/add-the-loai

        g) update Tin Tức theo id
            body:
                {
                    "TieuDe": "Tiêu đề loại tin tức mới",
                    "TieuDeKhongDau": "Tieu-de-loai-tin-tuc-moi",
                    "TomTat": "demo phan add tin tuc moi",
                    "NoiDung": "<\/h3>Nội dung tin tức: Khoá học Lập trình PHP tại trung tâm đào tạo tin học khoa phạm<\/h3>\r\n    \t<p>\r\n    \t<b>Hotline kỹ thuật <b>: 0967 908 907<br>\r\n    \t<b>Hotline tư vấn kháo học <b>: 094 276 4080<br>\r\n    \t<b>Địa chỉ <\/b>: 90 Lê Thị Riêng, P.Bến Thành, Q1, TPHCM<br>\r\n    \t<b>Website<\/b>: khoapham.vn<br>\r\n    \t<b>Học Online tại :<\/b>online.khoapham.vn<br>\r\n    \t<\/p>",
                    "Hinh": "FPT-2.jpg",
                    "NoiBat": "1",
                    "SoLuotXem": "0",
                    "idLoaiTin": "60f5512e5a3356492485766e"
                }
            url : https://news-api1412.herokuapp.com/tintuc/updateById/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/updateById/610ffac9e916df221b60b3b7

        h) delete Loại Tin theo id(Không xóa hoàn toàn doc, doc vẫn còn trong database)
            url : https://news-api1412.herokuapp.com/tintuc/deleteById/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/deleteById/610ffac9e916df221b60b3b7
        
        i) Restore Tin Tức theo id 
            url : https://news-api1412.herokuapp.com/tintuc/restoreById/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/restoreById/610ffac9e916df221b60b3b7

        k) Xóa vĩnh viễn Tin Tức theo id 
            url : https://news-api1412.herokuapp.com/tintuc/pemaneterly-delete-by-id/:id
            vd  : https://news-api1412.herokuapp.com/tintuc/pemaneterly-delete-by-id/610ffac9e916df221b60b3b7   

    4) Comment
        a) Hiển thị toàn bộ danh sách Comment
            url : https://news-api1412.herokuapp.com/comment/showAll

        b) Tìm kiếm doc theo id
            url : https://news-api1412.herokuapp.com/comment/findById/:id
            vd  : https://news-api1412.herokuapp.com/comment/findById/61100557007f8327f1161210

        c) Tìm kiếm doc đã xóa, nhưng chưa xóa vĩnh viễn theo id
            url : https://news-api1412.herokuapp.com/comment/findById-deleted/:id
            vd  : https://news-api1412.herokuapp.com/comment/findById-deleted/61100557007f8327f1161210

        d) Tìm kiếm doc chưa xóa hoặc đã xóa(chưa xóa vĩnh viễn)
            url : https://news-api1412.herokuapp.com/comment/find-one-with-deleted/:id
            vd  : https://news-api1412.herokuapp.com/comment/find-one-with-deleted/61100557007f8327f1161210

        e) Tìm kiếm các doc theo phân trang
            url : https://news-api1412.herokuapp.com/comment/findByPage?page=a&size=b
            vd  : https://news-api1412.herokuapp.com/comment/findByPage?page=2&size=10
            Mặc định page=1 và size=3

        f) Tạo mới một Comment
            body:
                {
                    "idUser": "60f581a9078a515542fa403c",
                    "idTinTuc": "60f55413e40ffe4add60e519",
                    "NoiDung": "Một comment dùng để demo phần add new comment"
                }
            
            url : https://news-api1412.herokuapp.com/comment/add-the-loai

        g) update Comment theo id
            body:
                {
                    "idUser": "60f581a9078a515542fa403c",
                    "idTinTuc": "60f55413e40ffe4add60e519",
                    "NoiDung": "Một comment dùng để demo phần add new comment"
                }
            url : https://news-api1412.herokuapp.com/comment/updateById/:id
            vd  : https://news-api1412.herokuapp.com/comment/updateById/61100557007f8327f1161210

        h) delete Comment theo id(Không xóa hoàn toàn doc, doc vẫn còn trong database)
            url : https://news-api1412.herokuapp.com/comment/deleteById/:id
            vd  : https://news-api1412.herokuapp.com/comment/deleteById/61100557007f8327f1161210
        
        i) Restore Comment theo id 
            url : https://news-api1412.herokuapp.com/comment/restoreById/:id
            vd  : https://news-api1412.herokuapp.com/comment/restoreById/61100557007f8327f1161210

        k) Xóa vĩnh viễn Comment theo id 
            url : https://news-api1412.herokuapp.com/comment/pemaneterly-delete-by-id/:id
            vd  : https://news-api1412.herokuapp.com/comment/pemaneterly-delete-by-id/61100557007f8327f1161210
        
    5) User
        a) Hiển thị toàn bộ danh sách User
            url : https://news-api1412.herokuapp.com/user/showAll

        b) Tìm kiếm doc theo id
            url : https://news-api1412.herokuapp.com/user/findById/:id
            vd  : https://news-api1412.herokuapp.com/user/findById/6110ad7572b3c42b113b6689

        c) Tìm kiếm doc đã xóa, nhưng chưa xóa vĩnh viễn theo id
            url : https://news-api1412.herokuapp.com/user/findById-deleted/:id
            vd  : https://news-api1412.herokuapp.com/user/findById-deleted/6110ad7572b3c42b113b6689

        d) Tìm kiếm doc chưa xóa hoặc đã xóa(chưa xóa vĩnh viễn)
            url : https://news-api1412.herokuapp.com/user/find-one-with-deleted/:id
            vd  : https://news-api1412.herokuapp.com/user/find-one-with-deleted/6110ad7572b3c42b113b6689

        e) Tìm kiếm các doc theo phân trang
            url : https://news-api1412.herokuapp.com/user/findByPage?page=a&size=b
            vd  : https://news-api1412.herokuapp.com/user/findByPage?page=2&size=10
            Mặc định page=1 và size=3

        f) Tạo mới một User
            body:
                {
                    "email": "nguyenvanan@gmail.com",
                    "pass": "abc",
                    "ten"  : "nguyen van a",
                    "tuoi" : "18",
                    "level": "1"
                }
            
            url : https://news-api1412.herokuapp.com/user/add-the-loai

        g) update User theo id
            body:
                {
                    "email": "nguyenvanan@gmail.com",
                    "pass": "abc",
                    "ten"  : "nguyen van a",
                    "tuoi" : "18",
                    "level": "1"
                }
            url : https://news-api1412.herokuapp.com/user/updateById/:id
            vd  : https://news-api1412.herokuapp.com/user/updateById/6110ad7572b3c42b113b6689

        h) delete User theo id(Không xóa hoàn toàn doc, doc vẫn còn trong database)
            url : https://news-api1412.herokuapp.com/user/deleteById/:id
            vd  : https://news-api1412.herokuapp.com/user/deleteById/6110ad7572b3c42b113b6689
        
        i) Restore User theo id 
            url : https://news-api1412.herokuapp.com/user/restoreById/:id
            vd  : https://news-api1412.herokuapp.com/user/restoreById/6110ad7572b3c42b113b6689

        k) Xóa vĩnh viễn User theo id 
            url : https://news-api1412.herokuapp.com/user/pemaneterly-delete-by-id/:id
            vd  : https://news-api1412.herokuapp.com/user/pemaneterly-delete-by-id/6110ad7572b3c42b113b6689
