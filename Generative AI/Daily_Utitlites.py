from docx import Document

doc = Document()
doc.add_paragraph(
    "john applied to the university on 14th may 2023. his application included transcripts and two recommendation letters.\n\n"
    "he has a bachelor's degree in computer science. john has experience working on machine learning projects during his undergraduate studies.\n\n"
    "the university has acknowledged receipt of the application."
)
doc.save("sample.docx")