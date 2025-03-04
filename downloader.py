import json
import os
import subprocess

# Load JSON file
json_path = "/home/nine/Projects/vueschool-downloader/output/course-details.json"

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Base directory for downloads
base_dir = os.path.expanduser("~/Videos/VueSchool_Courses")


# Function to clean filenames
def sanitize_filename(name):
    return "".join(c if c.isalnum() or c in " _-" else "_" for c in name)


# Iterate over courses
for course in data:
    course_title = sanitize_filename(course["title"])
    course_dir = os.path.join(base_dir, course_title)
    os.makedirs(course_dir, exist_ok=True)

    # Numbering chapters within the course
    for chapter_index, chapter in enumerate(course.get("chapters", []), start=1):
        chapter_number = f"{chapter_index:02d}"  # Format as 01, 02, etc.
        chapter_title = sanitize_filename(chapter["title"])
        chapter_dir = os.path.join(course_dir, f"{chapter_number} - {chapter_title}")
        os.makedirs(chapter_dir, exist_ok=True)

        # Numbering lessons within the chapter
        for lesson_index, lesson in enumerate(chapter.get("lessons", []), start=1):
            lesson_number = f"{lesson_index:02d}"  # Format as 01, 02, etc.
            lesson_title = sanitize_filename(lesson["title"])
            video_url = lesson.get("videoUrl")

            if video_url:
                output_filename = f"{lesson_number} - {lesson_title}.mp4"
                output_path = os.path.join(chapter_dir, output_filename)

                print(f"Downloading: {video_url} -> {output_path}")

                command = [
                    "yt-dlp",
                    "-f",
                    "bestvideo+bestaudio",
                    "--merge-output-format",
                    "mp4",
                    "--referer",
                    "https://vueschool.io",
                    "--downloader",
                    "aria2c",
                    "--downloader-args",
                    "aria2c:-x 16 -s 16 -k 1M",
                    "-o",
                    output_path,
                    video_url,
                ]

                subprocess.run(command)
