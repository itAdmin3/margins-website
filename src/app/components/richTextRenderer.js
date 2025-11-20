import Image from "next/image";

export default function RichTextRenderer({ content }) {
  return (
    <div>
      {content ? (
        content.map((block, index) => {
          switch (block.type) {
            // Render Paragraph
            case "paragraph":
              return (
                <p key={index} className="mb-4">
                  {block.children.map((child, i) => (
                    <TextFormatter key={i} {...child} />
                  ))}
                </p>
              );

            // Render Ordered and Unordered Lists
            case "list":
              return block.format === "ordered" ? (
                <ol key={index} className="list-decimal ml-6">
                  {block.children.map((item, i) => (
                    <li key={i}>
                      {item.children.map((child, j) => (
                        <TextFormatter key={j} {...child} />
                      ))}
                    </li>
                  ))}
                </ol>
              ) : (
                <ul key={index} className="list-disc ml-6">
                  {block.children.map((item, i) => (
                    <li key={i}>
                      {item.children.map((child, j) => (
                        <TextFormatter key={j} {...child} />
                      ))}
                    </li>
                  ))}
                </ul>
              );

            // Render Images
            case "image":
              return (
                <div key={index} className="my-4 flex justify-center">
                  <Image src={block.image.url} alt={block.image.alternativeText || "Image"} layout="responsive" width={block.image.width || 800} height={block.image.height || 600} className="min-w-[100%] min-h-[100%]" />
                </div>
              );

            // Render Headings (h1 - h6)
            case "heading":
              const HeadingTag = `h${block.level}`;
              return (
                <HeadingTag key={index} className={`text-${block.level * 2}xl font-bold mt-4 mb-2`}>
                  {block.children.map((child, i) => (
                    <TextFormatter key={i} {...child} />
                  ))}
                </HeadingTag>
              );

            // Render Blockquote
            case "quote":
              return (
                <blockquote key={index} className="border-l-4 border-gray-400 italic pl-4 my-4 text-gray-600">
                  {block.children.map((child, i) => (
                    <TextFormatter key={i} {...child} />
                  ))}
                </blockquote>
              );

            default:
              return null;
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
}
const TextFormatter = ({ text, bold, italic, underline, code, url, children }) => {
  let content = text;

  if (bold) content = <strong>{content}</strong>;
  if (italic) content = <em>{content}</em>;
  if (underline) content = <u>{content}</u>;
  if (code) content = <code className="bg-gray-200 p-1 rounded-sm">{content}</code>;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        {children.map((child, i) => (
          <TextFormatter key={i} {...child} />
        ))}{" "}
      </a>
    );
  }

  return <>{content}</>;
};
