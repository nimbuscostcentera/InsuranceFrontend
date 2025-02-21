import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./table.css";
import SearchableDropDown from "../SearchableDropDown";
import MultipleSelection from "../MultipleSelection";
import defaultimage from "../../Asset/default.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Table({
  params,
  setParams,
  isIcon,
  tab,
  ActionId,
  ActionFunc,
  onSorting,
  Col,
  isKarigarButton,
  receive,
  isDespatchButton,
  despatch,
  isDeliveryButton,
  delivery,
  isEdit,
  OnChangeHandler,
  OnSaveHandler,
  KarigarReceiveFunc,
  DespatchFunc,
  DeliveryFunc,
  EditedData,
  HandleMultiSelection,
  isView,
  viewPref,
  handleViewClick,
  isPrint,
  handleprint,
  isCheckButton,
  isCheckedField,
  isLoading,
}) {
  return (
    <table className="table table-responsive table-sm table-hover align-middle mytable">
      <thead>
        <tr className="table-secondary">
          <th scope="col" style={{ minWidth: "40px" }}>
            Srn
          </th>
          {Array.isArray(Col) &&
            Col?.map((col, index) => {
              return (
                <th
                  scope="col"
                  style={{ minWidth: col?.width || "100px" }}
                  key={index}
                >
                  <span>{col?.headername}</span>
                  {col?.isShortingOff ? null : (
                    <Button
                      variant="link"
                      style={{ padding: "1px 1px", color: "white" }}
                      onClick={() => {
                        onSorting(col?.fieldname, col?.type);
                      }}
                    >
                      <i className="bi bi-arrow-down-up"></i>
                    </Button>
                  )}
                </th>
              );
            })}
          {isCheckButton ? (
            <th scope="col" style={{ minWidth: "130px" }}>
              Sample Receive
            </th>
          ) : null}
          {isKarigarButton ? (
            <th scope="col" style={{ minWidth: "100px" }}>
              Karigar Receive
            </th>
          ) : null}
          {isDespatchButton ? (
            <th scope="col" style={{ minWidth: "85px" }}>
              Despatch
            </th>
          ) : null}
          {isDeliveryButton ? (
            <th scope="col" style={{ minWidth: "120px" }}>
              Sample Delivery
            </th>
          ) : null}
          {isEdit ? (
            <>
              <th scope="col" style={{ minWidth: "55px" }}>
                Edit
              </th>
              <th scope="col" style={{ minWidth: "55px" }}>
                {" "}
                Save{" "}
              </th>
            </>
          ) : null}
          {isView ? (
            <>
              <th scope="col" style={{ minWidth: "70px" }}>
                {viewPref} View
              </th>
            </>
          ) : null}
          {isPrint ? (
            <>
              <th scope="col" style={{ minWidth: "70px" }}>
                Print
              </th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <tr key={index}>
              {/* { console.log(ele)} */}
              <td>
                <Skeleton width={30} />
              </td>
              {Array.isArray(Col) &&
                Col?.map((_, colIndex) => (
                  <td key={colIndex}>
                    <Skeleton height={30} />
                  </td>
                ))}
              {/* Skeleton for Edit, View, Print Buttons */}
              {isEdit && (
                <>
                  <td>
                    <Skeleton circle={true} height={26} width={26} />
                  </td>
                  <td>
                    <Skeleton circle={true} height={26} width={26} />
                  </td>
                </>
              )}
              {isView && (
                <td>
                  <Skeleton circle={true} height={26} width={26} />
                </td>
              )}
              {isPrint && (
                <td>
                  <Skeleton circle={true} height={26} width={26} />
                </td>
              )}
            </tr>
          ))
        ) : tab?.length == 0 ? (
          <tr>
            <td></td>
            <td
              colSpan={Col?.length + 2}
              style={{
                height: "250px",
                textAlign: "center",
                fontSize: "16px",
                color: "#777",
                backgroundColor: "#f8f9fa",
                letterSpacing: "1px",
                borderBottom: "2px solid #ddd",
              }}
            >
              {" "}
              <i
                className="bi bi-exclamation-circle"
                style={{
                  fontSize: "16px",
                  color: "#999",
                  marginRight: "8px",
                }}
              ></i>
              <span
                style={{
                  fontSize: "16px",
                  color: "#999",
                    marginRight: "8px",
                  fontStyle: ""
                }}
              >
                No Data Found
              </span>
            </td>
          </tr>
        ) : (
          Array.isArray(tab) &&
          tab.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                {Array.isArray(Col) &&
                  Col?.map((field, indexfield) => (
                    <td key={indexfield}>
                      {ActionId === index && !field?.isNotEditable ? (
                        field?.isSelection ? (
                          field?.isMultiSelection ? (
                            <MultipleSelection
                              options={field?.options}
                              handleChange={HandleMultiSelection}
                              selectedVal={
                                EditedData[field?.selectionname] ||
                                item[field?.selectionname]
                              }
                              label={field?.labelname}
                              placeholder={field?.placeholder}
                              key={indexfield}
                              defaultval={EditedData[field?.labelname]}
                            />
                          ) : (
                            <SearchableDropDown
                              options={field?.options}
                              handleChange={(e) => OnChangeHandler(index, e)}
                              selectedVal={
                                EditedData[field?.selectionname] ||
                                item[field?.selectionname]
                              }
                              label={field?.selectionname}
                              placeholder={field?.headername}
                              key={indexfield}
                              defaultval={item[field?.fieldname]}
                            />
                          )
                        ) : (
                          <input
                            name={field?.fieldname}
                            maxLength={field?.max}
                            label={field?.headername}
                            placeholder={field?.headername}
                            value={EditedData[field?.fieldname] || ""}
                            type={field?.type}
                            onChange={(e) => OnChangeHandler(index, e)}
                            className="input-cell"
                            style={{ width: "100%" }}
                          />
                        )
                      ) : field?.fieldname === "Img" ? (
                        <a
                          href={`${
                            process.env.REACT_APP_BASEURL_IMAGE
                          }/images/${
                            item[field?.fieldname] || "default-image.jpg"
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src={`${
                              process.env.REACT_APP_BASEURL_IMAGE
                            }/images/${
                              item[field?.fieldname] || "default-image.jpg"
                            }`}
                            alt="img"
                            style={{
                              width: "100%",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultimage;
                            }}
                          />
                        </a>
                      ) : (
                        item[field?.fieldname]
                      )}
                    </td>
                  ))}
                {/* Buttons with Skeleton Loaders */}
                {isEdit ? (
                  <>
                    <td>
                      <button
                        className="btn btn-link"
                        style={{ padding: "0" }}
                        onClick={() => {
                          ActionFunc(index);
                        }}
                      >
                        <i
                          className="bi bi-pencil-square"
                          style={{ color: "#ac4bec", fontSize: "22px" }}
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-link"
                        style={{ padding: "0" }}
                        onClick={() => OnSaveHandler(index)}
                        disabled={
                          ActionId == null ||
                          ActionId == undefined ||
                          ActionId == -1
                        }
                      >
                        <i
                          className="bi bi-floppy"
                          style={{
                            color:
                              index === ActionId && ActionId !== null
                                ? "green"
                                : "lightgrey",
                            fontSize: "22px",
                          }}
                        ></i>
                      </button>
                    </td>
                  </>
                ) : null}
                {isView ? (
                  <td>
                    <button
                      className="btn btn-link"
                      style={{ padding: "0" }}
                      onClick={() => handleViewClick(index)}
                    >
                      <i
                        className="bi bi-eye text-primary"
                        style={{ color: "#ac4bec", fontSize: "22px" }}
                      ></i>
                    </button>
                  </td>
                ) : null}
                {isPrint ? (
                  <td>
                    <button
                      className="btn btn-link"
                      style={{ padding: "0" }}
                      onClick={() => handleprint(index)}
                    >
                      <i
                        className="bi bi-printer text-primary"
                        style={{ color: "#ac4bec", fontSize: "22px" }}
                      ></i>
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Table;
