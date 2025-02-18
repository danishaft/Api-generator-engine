import { getApiUrl } from "@/utils/api";
import { motion } from 'framer-motion';
import { Check, ExternalLink, FileUp } from "lucide-react";

interface DeploymentPanelProps {
    isDeployed: boolean;
    deployedRoute: string;
    apiKey: string;
    routeInput: string;
    setRouteInput: (routeInput: string) => void;
    warning: string | null;
    loading: boolean;
    handleDeploy: () => void;
    goBack: () => void;
}

export const DeployStep = ({ 
    isDeployed, 
    deployedRoute, 
    apiKey, 
    routeInput, 
    setRouteInput, 
    warning,
    goBack,
    loading,
    handleDeploy

  }: DeploymentPanelProps) => (
    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto p-6 space-y-8"
            >
              <div className="bg-white shadow-lg rounded-lg p-6 border">
                  <div>
                    <h3 className="text-lg font-medium  mb-4">Deploy Your API</h3>

                    <div className="space-y-6">
                      <div>
                      </div>
                      {!isDeployed ? (
                        <div className="space-y-6">
                          {/* route input */}
                          <div className="relative">
                            <div className="flex items-center space-x-2">
                              <div className="">/api/</div>
                              <input
                                type="text"
                                value={routeInput}
                                onChange={(e) => setRouteInput(e.target.value)}
                                placeholder="Enter your API route"
                                className="flex-1 bg-white rounded px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            {warning && (
                              <div className="mt-2 text-amber-400 text-sm">
                                {warning}
                              </div>
                            )}
                          </div>
                          
                          {/* buttons */}
                          <div className="flex justify-between items-center pt-4">
                            <button
                              onClick={() => goBack}
                              className="px-4 py-2 border border-foreground rounded-lg text-sm font-medium "
                            >
                              Back
                            </button>
                            <button
                              onClick={handleDeploy}
                              disabled={!routeInput || loading}
                              className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Deploy API
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                            <div className="flex items-center space-x-2 text-emerald-500">
                              <Check/>
                              <span className="font-medium">API Successfully Deployed!</span>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm">Your API is ready! Here&apos;s your endpoint:</p>
                            <div className="p-4 bg-background shadow-md rounded-lg">
                              <div className="flex items-center justify-between">
                                <code className="text-sm text-primary">
                                  {getApiUrl(deployedRoute)}
                                </code>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => window.open(getApiUrl(deployedRoute), '_blank')}
                                    className="p-2 bg-background rounded-md "
                                    title="Open in browser"
                                  >
                                    <ExternalLink/>
                                  </button>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(getApiUrl(deployedRoute))}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-white/60"
                                    title="Copy to clipboard"
                                  >
                                    <FileUp/>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 space-y-2">
                              <label className="block text-sm">
                                cURL Command
                              </label>
                              <div className="flex items-center space-x-2">
                                <code className="flex-1 px-4 py-3 bg-background rounded-lg font-mono text-sm overflow-x-auto">
                                  {`curl -X GET "${getApiUrl(deployedRoute)}" \\
                                    -H "Authorization: Bearer ${apiKey}" \\
                                    -H "Content-Type: application/json"`}
                                </code>
                                <button
                                  onClick={() => navigator.clipboard.writeText(
                                    `curl -X GET "${getApiUrl(deployedRoute)}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json"`
                                  )}
                                  className="p-2 bg-background rounded-md "
                                  title="Copy to clipboard"
                                >
                                  <FileUp/>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
              </div>
            </motion.div>
  );
  