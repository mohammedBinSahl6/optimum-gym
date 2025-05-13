const BlogContent = ({ content }: { content: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContent;
