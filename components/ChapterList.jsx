import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ChapterList = ({ course }) => {
  const chapters = course?.courseLayout?.chapters || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      <Accordion type="single" collapsible className="w-full">
        {chapters.map((item, ind) => (
          <AccordionItem key={ind} value={`chapter-${ind}`}>
            <AccordionTrigger className="text-base font-medium">
              {item?.title}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600">
              <p className="mb-2">{item?.summary}</p>
              {item?.topics && (
                <ul className="list-disc list-inside text-gray-500 space-y-1">
                  {item.topics.map((topic, tInd) => (
                    <li key={tInd}>{topic}</li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterList;
