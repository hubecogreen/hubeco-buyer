"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { normalizePath } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { IoIosClose } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";

const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

export default function QuoteDetailsDialog({
  quoteOpen,
  setQuoteOpen,
  initialState,
  selectedView,
}: any) {
  return (
    <Dialog open={quoteOpen}>
      <DialogContent className="max-h-[500px] overflow-y-auto">
        <Box p={4}>
          {/* Quote Header */}
          <DialogHeader>
            <h2 className="text-xl font-semibold my-3">
              #{selectedView.quotationId}
            </h2>
          </DialogHeader>

          <DialogClose
            onClick={() => setQuoteOpen(false)}
            className="absolute top-4 right-4"
          >
            <IoIosClose className="w-6 h-6  z-10 bg-white  text-black" />
          </DialogClose>

          {/* Product Details */}
          <Accordion allowMultiple mb={6}>
            {initialState.products.map((product: any, index: number) => {
              const ids = selectedView?.products.map((p: any) => p.variantId);
              if (ids.includes(product._id) === false) return null;
              return (
                <AccordionItem key={product._id}>
                  <AccordionButton>
                    <Flex alignItems="center">
                      <Image
                        // src={
                        //   product.variantId.thumbnail
                        //     ? `${assetUrl}/${product.variantId.thumbnail}`
                        //     : ""
                        // }
                        // src={
                        //   product.variantId.thumbnail
                        //     ? (assetUrl + "/" + product.variantId.thumbnail).includes("//admin")
                        //       ? (assetUrl + "/" + product.variantId.thumbnail).replace(
                        //           "//admin",
                        //           "/admin"
                        //         )
                        //       : `${assetUrl}/${product.variantId.thumbnail}`
                        //     : "/images/product-placeholder.webp"
                        // }
                        src={
                          product.variantId.thumbnail
                            ? normalizePath(
                                `${assetUrl}/${product.variantId.thumbnail}`
                              )
                            : "/images/product-placeholder.webp"
                        }
                        alt={product.variantId.variantName}
                        boxSize="16"
                        objectFit="cover"
                        rounded="md"
                        mr={4}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/product-placeholder.webp";
                        }}
                        loading="lazy"
                      />
                      <Heading size="md" isTruncated maxW="250px">
                        {product.variantId.variantName === "Default"
                          ? product.variantId.productId.name
                          : product.variantId.variantName}
                      </Heading>
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Flex
                      wrap="wrap"
                      justify="space-between"
                      color="gray.700"
                      fontSize="sm"
                    >
                      {Array.isArray(product?.variantId?.attributes) &&
                        product?.variantId?.attributes.map((attribute: any) => (
                          <Box key={attribute.name} flex="1 0 auto" pr={4}>
                            <Text fontWeight="light">{attribute.name}</Text>
                            <Text fontWeight="medium">{attribute.value}</Text>
                          </Box>
                        ))}
                      <Box flex="1 0 auto" pr={4}>
                        <Text fontWeight="light">Quantity</Text>
                        <Text fontWeight="medium" pb={2}>
                          {selectedView.products[index].quantity}
                        </Text>
                      </Box>
                      <Box flex="1 0 auto" pr={4}>
                        <Text fontWeight="light">Tax Amount</Text>
                        <Text fontWeight="medium" pb={2}>
                          {selectedView.products[index].taxableAmount}
                        </Text>
                      </Box>
                      <Box flex="1 0 auto" pr={4}>
                        <Text fontWeight="light">Unit Price</Text>
                        <Text fontWeight="medium" pb={2}>
                          {selectedView.products[index].unitPrice}
                        </Text>
                      </Box>
                      <Box flex="1 0 auto" pr={4}>
                        <Text fontWeight="light">Delivery Date</Text>
                        <Text fontWeight="medium" pb={2}>
                          {dayjs(
                            selectedView.products[index].deliveryDate
                          ).format("DD-MM-YYYY")}
                        </Text>
                      </Box>
                      <Box flex="1 0 auto" w="full">
                        <Text fontWeight="bold">Notes</Text>
                        <Text fontWeight="medium" pb={2}>
                          {selectedView.products[index].notes}
                        </Text>
                      </Box>
                      <Box flex="1 0 auto" w="full">
                        <Text fontWeight="bold">Warranty</Text>
                        <Text fontWeight="medium" pb={2}>
                          {selectedView.products[index].warranty}
                        </Text>
                      </Box>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Additional Requirements */}
          <Box mt={6}>
            <Heading size="xl" mb={4}>
              Additional Requirements
            </Heading>

            {/* Delivery Terms */}
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold">Delivery Terms</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>{selectedView.deliveryTerms || "-"}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Payment Terms */}
            <Accordion allowMultiple mt={4}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold">Payment Terms</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>{selectedView.paymentTerms}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Other / Guarantee */}
            <Accordion allowMultiple mt={4}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold">
                      Other Terms and Conditions
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>{selectedView.otherTerms || "-"}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Certification */}
            <Accordion allowMultiple mt={4}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold" className="font-medium">
                      Certification Required
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Flex
                    alignItems="center"
                    justify="space-between"
                    border="1px solid #efeded"
                    p={4}
                  >
                    <Flex alignItems="center">
                      <Image
                        // src={
                        //   selectedView.products[0].certificate.endsWith(".pdf")
                        //     ? "/images/pdflogo.webp"
                        //     : selectedView.products[0].certificate
                        //     ? (
                        //         assetUrl +
                        //         "/" +
                        //         selectedView.products[0].certificate
                        //       ).includes("//admin")
                        //       ? (
                        //           assetUrl +
                        //           "/" +
                        //           selectedView.products[0].certificate
                        //         ).replace("//admin", "/admin")
                        //       : `${assetUrl}/${selectedView.products[0].certificate}`
                        //     : "/images/product-placeholder.webp"
                        // }
                        src={
                          selectedView.products[0].certificate.endsWith(".pdf")
                            ? "/images/pdflogo.webp"
                            : selectedView.products[0].certificate
                            ? normalizePath(`${assetUrl}/${selectedView.products[0].certificate}`)
                            : "/images/product-placeholder.webp"
                        }
                        boxSize="70px"
                        rounded="md"
                        mr={8}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/product-placeholder.webp";
                        }}
                        loading="lazy"
                      />
                      <Text fontSize="lg" fontWeight="medium">
                        Certificate provided
                      </Text>
                    </Flex>
                    {selectedView.products[0].certificate.endsWith(".pdf") ? (
                      <Link
                        href={`${assetUrl}/${selectedView.products[0].certificate}`}
                        target="_blank"
                        mr={5}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="medium"
                          color="secondary"
                        >
                          View
                        </Text>
                      </Link>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild className="max-w-[90%]">
                          {/* <Button variant="outline">View</Button> */}
                          <Link href="#" className=" md:mr-5">
                            <p className="text-secondary text-lg font-medium">
                              View
                            </p>
                          </Link>
                        </DialogTrigger>
                        <DialogContent className="w-[98%] fixed  h-[98%] lg:w-full ">
                          <DialogClose className="flex justify-end absolute z-50 right-[15px] top-[15px] w-full shadow-2xl">
                            <IoCloseCircleSharp color="white" size={30} />
                          </DialogClose>
                          <div className="h-full w-full ">
                            <Image
                              src={`${
                                assetUrl +
                                "/" +
                                selectedView.products[0].certificate
                              }`}
                              className="p-[10px] rounded "
                              objectFit="cover"
                              alt={selectedView.products[0].certificate}
                              fill={true}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/images/product-placeholder.webp";
                              }}
                              loading="lazy"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Submission Deadline */}
            <Box mt={4}>
              <Text fontWeight="semibold" color="#B90647">
                Quote Validity{" "}
                <Text as="span" color="brand.700">
                  {dayjs(selectedView.quoteValidity).format("DD-MM-YYYY")}
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
