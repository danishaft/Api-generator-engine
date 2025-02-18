import { motion } from 'framer-motion';


interface SchemaPanelProps {
    schemaStr: string;
    setSchemaStr: (schemaStr: string) => void;
    onSubmit: () => void;
    goBack: () => void; 
}

  
export const SchemaStep = ({ schemaStr, setSchemaStr, goBack, onSubmit}: SchemaPanelProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto p-6"
    >
        <div className=" backdrop-blur-sm rounded-lg p-6 border border-background">
            <div className="space-y-4">
                <h2 className="text-lg font-bold">Generate Schema</h2>
                <p className="text-[#757677]">Review and edit the generated schema for your data extraction</p>

                <div className="mt-4">
                    <textarea
                    value={schemaStr}
                    onChange={(e) => setSchemaStr(e.target.value)}
                    className="w-full h-96 bg-white shadow-lg font-mono text-sm rounded-lg border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your JSON schema here..."
                    />
                </div>

                <div className="flex justify-between items-center pt-4">
                    <button
                    onClick={goBack }
                    className="px-4 py-2 border border-foreground rounded-lg text-sm font-medium "
                    >
                    Back
                    </button>
                    <button
                    onClick={onSubmit}
                    disabled={!schemaStr}
                    className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    Continue
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
)