# Database Schema - Vocabio Backend

Tổng hợp các bảng database mới được tạo cho hệ thống Vocabio.

## 1. Folders Table

```sql
Table folders {
  _id varchar [pk]
  user_id varchar [ref: > users._id, index]
  name varchar(255)
  parent_id varchar [ref: > folders._id, index]
  created_at timestamp
  updated_at timestamp
  
  indexes {
    (user_id, parent_id, name) [unique]
  }
}
```

**Mô tả:** Quản lý thư mục của người dùng, hỗ trợ cấu trúc thư mục lồng nhau.

## 2. Folder Items Table

```sql
Table folder_items {
  _id varchar [pk]
  folder_id varchar [ref: > folders._id, index]
  item_type varchar [check: 'study_set', 'quiz', 'class']
  item_id varchar [index]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
  
  indexes {
    (folder_id, item_type, item_id) [unique]
  }
}
```

**Mô tả:** Lưu trữ các item (study_set, quiz, class) trong thư mục.

## 3. SRS Progress Table

```sql
Table srs_progress {
  _id varchar [pk]
  user_id varchar [ref: > users._id]
  vocabulary_id varchar [ref: > vocabularies._id]
  interval int [default: 1]
  easiness float [default: 2.5]
  repetitions int [default: 0]
  next_review_at timestamp [index]
  last_review_at timestamp
  created_at timestamp
  updated_at timestamp
  
  indexes {
    (user_id, vocabulary_id) [pk, unique]
    (user_id, next_review_at) [index]
  }
}
```

**Mô tả:** Theo dõi tiến độ học từ vựng theo phương pháp Spaced Repetition System (SRS).

## 4. Quizzes Table

```sql
Table quizzes {
  _id varchar [pk]
  user_id varchar [ref: > users._id, index]
  study_set_id varchar [ref: > study_sets._id, index]
  type varchar  // 'multiple_choice', 'fill_blank', etc.
  title varchar(255)
  created_at timestamp
  updated_at timestamp
}
```

**Mô tả:** Quản lý các bài quiz của người dùng.

## 5. Quiz Questions Table

```sql
Table quiz_questions {
  _id varchar [pk]
  quiz_id varchar [ref: > quizzes._id, index]
  vocabulary_id varchar [ref: > vocabularies._id, index]
  question_type varchar
  question_text text
  audio_url text [null]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}
```

**Mô tả:** Lưu trữ các câu hỏi trong quiz.

## 6. Quiz Answers Table

```sql
Table quiz_answers {
  _id varchar [pk]
  question_id varchar [ref: > quiz_questions._id, index]
  answer_text text
  is_correct boolean [default: false]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}
```

**Mô tả:** Lưu trữ các đáp án cho câu hỏi quiz.

## 7. Quiz Results Table

```sql
Table quiz_results {
  _id varchar [pk]
  user_id varchar [ref: > users._id, index]
  quiz_id varchar [ref: > quizzes._id, index]
  score float
  total_questions int
  correct_answers int
  time_taken int  // seconds
  created_at timestamp
  updated_at timestamp
  
  indexes {
    (user_id, quiz_id) [index]
  }
}
```

**Mô tả:** Lưu trữ kết quả làm bài quiz của người dùng.

## Relationships

```
users ||--o{ folders : "có"
folders ||--o{ folders : "parent"
folders ||--o{ folder_items : "chứa"
users ||--o{ srs_progress : "có"
vocabularies ||--o{ srs_progress : "được theo dõi"
users ||--o{ quizzes : "tạo"
study_sets ||--o{ quizzes : "có"
quizzes ||--o{ quiz_questions : "chứa"
vocabularies ||--o{ quiz_questions : "được hỏi"
quiz_questions ||--o{ quiz_answers : "có"
users ||--o{ quiz_results : "làm"
quizzes ||--o{ quiz_results : "có kết quả"
```

## Notes

- Tất cả các bảng sử dụng `_id` làm primary key (kiểu VARCHAR/UUID)
- Các bảng có `timestamps: true` sẽ tự động có `createdAt` và `updatedAt`
- Foreign keys được thiết lập với ON DELETE CASCADE hoặc SET NULL tùy theo quan hệ
- Indexes được tối ưu cho các truy vấn thường xuyên


